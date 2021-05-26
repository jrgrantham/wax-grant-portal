import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import {
  addCapex,
  reorderCapex,
  getCapexCost,
} from "../../store/entities/capex";
import add from "../../images/addMaterials.png";
import addGrey from "../../images/add-grey.png";
import { Container } from "./costsStyling";
import { nextIndexOfGroup, numberToCurrency, roundTo } from "../../helpers";
import CapexRow from "./capexRow";

function CapexInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const capex = state.entities.capex.data;
  const leader = state.user.selectedLeader;
  const { maxCapex } = state.entities.options.data;
  const total = getCapexCost(state)[leader];
  const formattedCost = numberToCurrency(total)
  // console.log(totals);
  const combined = leader === "combined";
  const group = combined
    ? capex
    : capex.filter((item) => item.leader === leader);

  function handleAddCapex() {
    const position = nextIndexOfGroup(group, capex);
    const newCapex = {
      leader,
      capexId: uuidv4(),
      condition: "New",
      description: "New capex",
      depreciation: 1,
      currentValue: 1,
      residualValue: 1,
      utilisation: 1,
    };
    dispatch(addCapex({ newCapex, position }));
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const capex = group[result.source.index];
    dispatch(reorderCapex({ capex, movement }));
  }

  return (
    <Container>
      <div className="materials">
        <div className="row titles leaderTabMargin">
          <p className="title small">Condition</p>
          <p className="title large">Description</p>
          <Tippy content="Depreciation Period (months)">
            <p className="title small">Deprec</p>
          </Tippy>
          <Tippy content="Current Value">
            <p className="title small">Current</p>
          </Tippy>
          <Tippy content="Residual Value">
            <p className="title small">Residual</p>
          </Tippy>
          {/* <Tippy content="Utilisation"> */}
            <p className="title small">Utilisation</p>
          {/* </Tippy> */}
          <p className="title small">Total</p>
        </div>
        <div className="rows">
          <DragDropContext onDragEnd={handleMovingRow}>
            <Droppable droppableId="capex">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {group.map((capex, index) => {
                    return (
                      <Draggable
                        key={capex.capexId}
                        draggableId={capex.capexId}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="MonthContainer packBackground"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <CapexRow
                              provided={provided}
                              index={index}
                              key={index}
                              capex={capex}
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
            {combined ? null : group.length >= maxCapex ? (
              <Tippy content={`Maximum ${maxCapex}`}>
                <button className="addIcon">
                  <img src={addGrey} alt="add" />
                </button>
              </Tippy>
            ) : (
              <Tippy content="Add CapEx">
                <button className="addIcon" onClick={handleAddCapex}>
                  <img src={add} alt="add" />
                </button>
              </Tippy>
            )}
            {group.length > 0 ? (
              <>
                <p className="title small" />
                <p className="title large" />
                <p className="title small" />
                <p className="title small" />
                <p className="title small" />
                <p className="title small" />
                <div className="total">
                  <p className="field display small">
                    {formattedCost}
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
export default CapexInfo;
