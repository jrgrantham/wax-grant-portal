import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippy.js/react";
import {
  addTravel,
  reorderTravel,
  getTravelCost,
} from "../../store/entities/travel";
import add from "../../images/addMaterials.png";
import addGrey from "../../images/add-grey.png";
import { Container } from "./costsStyling";
import { nextIndexOfGroup } from "../../helpers";
import TravelRow from "./travelRow";

function TravelInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const travel = state.entities.travel.data;
  const leader = state.user.selectedLeader;
  const { maxTravel } = state.entities.options.data;
  const totals = getTravelCost(state);
  const combined = leader === "combined";
  const group = combined
    ? travel
    : travel.filter((item) => item.leader === leader);

  function handleAddTravel() {
    const position = nextIndexOfGroup(group, travel);
    const newTravel = {
      travelId: uuidv4(),
      leader: leader,
      description: "New journey",
      cost: 1,
      quantity: 1,
    };
    dispatch(addTravel({ newTravel, position }));
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const travel = group[result.source.index];
    dispatch(reorderTravel({ travel, movement }));
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
            <Droppable droppableId="travel">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {group.map((travel, index) => {
                    return (
                      <Draggable
                        key={travel.travelId}
                        draggableId={travel.travelId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="MonthContainer packBackground"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <TravelRow
                              provided={provided}
                              index={index}
                              key={index}
                              travel={travel}
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
          <div className="row">
            {combined ? null : group.length >= maxTravel ? (
              <Tippy content={`Maximum ${maxTravel}`}>
                <button className="addIcon">
                  <img src={addGrey} alt="add" />
                </button>
              </Tippy>
            ) : (
              <Tippy content="Add materials">
                <button className="addIcon" onClick={handleAddTravel}>
                  <img src={add} alt="add" />
                </button>
              </Tippy>
            )}
            {group.length > 0 ? (
              <>
                <p className="field display materialsDescription" />
                <p className="field display materialsCost" />
                <p className="field display materialsQuantity" />
                <div className="total">
                  <p className="field display materialsTotal">
                    {totals[leader]}
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Container>
  );
}
export default TravelInfo;
