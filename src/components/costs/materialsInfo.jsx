import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippy.js/react";
import {
  addMaterial,
  reorderMaterials,
  getMaterialsCost,
} from "../../store/entities/materials";
import add from "../../images/addMaterials.png";
import addGrey from "../../images/add-grey.png";
import { Container } from "./costsStyling";
import { nextIndexOfGroup } from "../../helpers";
import MaterialsRow from "./materialsRow";

function MaterialsInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const materials = state.entities.materials.data;
  const leader = state.user.selectedLeader;
  const { maxMaterials } = state.entities.options.data;
  const totals = getMaterialsCost(state);
  const combined = leader === "combined";
  const group = combined
    ? materials
    : materials.filter((item) => item.leader === leader);

  function handleAddMaterial() {
    const position = nextIndexOfGroup(group, materials);
    const newMaterial = {
      materialId: uuidv4(),
      leader: leader,
      description: "New material",
      cost: 1,
      quantity: 1,
    };
    dispatch(addMaterial({ newMaterial, position }));
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const material = group[result.source.index];
    dispatch(reorderMaterials({ material, movement }));
  }

  return (
    <Container>
      <div className="materials">
        <div className="row titles leaderTabMargin">
          <p className="title materialsDescription">Description</p>
          <p className="title materialsCost">Cost (£)</p>
          <p className="title materialsQuantity">Quantity</p>
          <p className="title materialsTotal">Total</p>
        </div>
        <div className="rows">
          <DragDropContext onDragEnd={handleMovingRow}>
            <Droppable droppableId="materials">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {group.map((material, index) => {
                    return (
                      <Draggable
                        key={material.materialId}
                        draggableId={material.materialId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="MonthContainer packBackground"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <MaterialsRow
                              provided={provided}
                              index={index}
                              key={index}
                              material={material}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {group.length > 0 ? (
            <div className="row">
              <p className="field display materialsDescription" />
              <p className="field display materialsCost" />
              <p className="field display materialsQuantity" />
              <div className="total">
                <p className="field display materialsTotal">{totals[leader]}</p>
                {/* <p className="field display labourCost">{Math.round(cost)}</p> */}
                {/* <p className="field display labourDays">{Math.round(days)}</p> */}
              </div>
            </div>
          ) : null}
          {combined ? null : group.length >= maxMaterials ? (
            <Tippy content={`Maximum ${maxMaterials}`}>
              <button className="addIcon">
                <img src={addGrey} alt="add" />
              </button>
            </Tippy>
          ) : (
            <Tippy content="Add materials">
              <button className="addIcon" onClick={handleAddMaterial}>
                <img src={add} alt="add" />
              </button>
            </Tippy>
          )}
        </div>
      </div>
    </Container>
  );
}
export default MaterialsInfo;
