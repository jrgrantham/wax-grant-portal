import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import GanttRowdeadlines from "./ganttDeadlineRowInfo";
import {
  reorderDeadline,
  addDeadline,
} from "../../store/projectData/deadlines";
import addMiles from "../../images/addMilestone.png";
import addDeads from "../../images/addDeliverable.png";
import { nextIndexOfGroup } from "../../helpers";
import { Container } from "./ganttPackStyling";

function GanttPackDeadlines(props) {
  const title = props.title;
  const packData = props.workPackData;
  const dispatch = useDispatch();
  const deadlines = useSelector((state) => state.deadlines.data);

  function addNewRow() {
    const newPosition = nextIndexOfGroup(packData, deadlines);
    const type = title.toLowerCase().slice(0, -1);
    dispatch(addDeadline({ type, newPosition }));
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const deadlineId = packData[result.source.index].deadlineId;
    dispatch(reorderDeadline({ deadlineId, movement }));
  }

  const add = title === 'Deliverables' ? addDeads : addMiles;

  return (
    <Container titleBarColor={props.titleBarColor}>
      <div className="titleBar">
        <h3>{title}</h3>
      </div>
      <DragDropContext onDragEnd={handleMovingRow}>
        <Droppable droppableId={title}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {packData.map((deadline, index) => {
                return (
                  <Draggable
                    key={deadline.deadlineId}
                    draggableId={deadline.deadlineId}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="MonthContainer packBackground"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <GanttRowdeadlines
                          provided={provided}
                          key={index}
                          deadline={deadline}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <div className="bottom packBackground">
                <Tippy content={`Add ${title}`}>
                  <button className="evenWidth" onClick={addNewRow}>
                    <img src={add} alt="add" />
                  </button>
                </Tippy>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
export default GanttPackDeadlines;
