import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippy.js/react";
import {
  addOther,
  reorderOther,
  getOtherCost,
} from "../../store/entities/other";
import add from "../../images/addMaterials.png";
import addGrey from "../../images/add-grey.png";
import { Container } from "./costsStyling";
import { nextIndexOfGroup } from "../../helpers";
import OtherRow from "./otherRow";

function OtherInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const other = state.entities.other.data;
  const leader = state.user.selectedLeader;
  const { maxOther } = state.entities.options.data;
  const totals = getOtherCost(state);
  const combined = leader === "combined";
  const group = combined
    ? other
    : other.filter((item) => item.leader === leader);

  function handleAddOther() {
    const position = nextIndexOfGroup(group, other);
    const newOther = {
      otherId: uuidv4(),
      leader: leader,
      description: "New other",
      cost: 1,
    };
    dispatch(addOther({ newOther, position }));
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const other = group[result.source.index];
    dispatch(reorderOther({ other, movement }));
  }

  return (
    <Container>
      <div className="materials">
        <div className="row titles leaderTabMargin">
          <p className="title materialsDescription">Description</p>
          <p className="title materialsCost">Cost (£)</p>
        </div>
        <div className="rows">
          <DragDropContext onDragEnd={handleMovingRow}>
            <Droppable droppableId="other">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {group.map((other, index) => {
                    return (
                      <Draggable
                        key={other.otherId}
                        draggableId={other.otherId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="MonthContainer packBackground"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <OtherRow
                              provided={provided}
                              index={index}
                              key={index}
                              other={other}
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
            {combined ? null : group.length >= maxOther ? (
              <Tippy content={`Maximum ${maxOther}`}>
                <button className="addIcon">
                  <img src={addGrey} alt="add" />
                </button>
              </Tippy>
            ) : (
              <Tippy content="Add other">
                <button className="addIcon" onClick={handleAddOther}>
                  <img src={add} alt="add" />
                </button>
              </Tippy>
            )}
            {group.length > 0 ? (
              <>
                <p className="field display materialsDescription" />
                <div className="total">
                  <p className="field display materialsCost">
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
export default OtherInfo;
