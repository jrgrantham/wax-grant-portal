import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";

import { Container } from "./ganttPackStyling";

import {
  reorderTasks,
  addTask,
  // updateTaskPackTitle,
  deleteTask,
  updateTaskKey,
} from "../../store/projectData/tasks";
import GanttTaskRowInfo from "./ganttTaskRowInfo";
import EditModal from "../modals/ganttEditModal";
import tick from "../../images/tick-white.png";
import add from "../../images/addTask.png";
import addGray from "../../images/add-grey.png";
import bin from "../../images/bin-grey.png";
import { deleteTaskAllocations } from "../../store/projectData/allocations";

function GanttPackWork(props) {
  const dispatch = useDispatch();

  const { title, index, packData } = props;
  const wpNumber = index + 1;
  const { maxTasksPerPackage } = useSelector((state) => state.options.data);

  const [edit, setEdit] = useState(false);
  const [editTitleWindow, setEditTitleWindow] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const { projectLength } = useSelector((state) => state.project.data.details);
  function handleAddNewRow() {
    const [lastTask] = packData.slice(-1);
    const lastTaskId = lastTask.taskId;
    const workPackageId = lastTask.workPackageId;
    const workPackageTitle = lastTask.workPackageTitle;
    dispatch(
      addTask({ lastTaskId, workPackageId, workPackageTitle, projectLength })
    );
  }

  function calculateDays() {
    let days = 0;
    packData.forEach((task) => {
      days += task.days;
    });
    return days;
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const movement = result.destination.index - result.source.index;
    const taskId = packData[result.source.index].taskId;
    dispatch(reorderTasks({ taskId, movement }));
  }

  function handleEditTitle(value) {
    if (value === "Deliverables" || title === "Milestones") return;
    setNewTitle(value);
  }

  function acceptEditedTitle() {
    if (title !== newTitle)
      packData.forEach((task) => {
        dispatch(
          updateTaskKey({
            taskId: task.taskId,
            key: "workPackageTitle",
            value: newTitle,
          })
        );
      });
    // dispatch(updateTaskPackTitle({ oldTitle: title, newTitle: newTitle }));
    setEditTitleWindow(false);
  }

  function handleRemovePack() {
    const taskList = [...new Set(packData.map((task) => task.taskId))];
    taskList.forEach((taskId) => {
      dispatch(deleteTaskAllocations({ taskId }));
      dispatch(deleteTask({ taskId }));
    });
    // setConfirmDelete(false);
  }

  return (
    <Container titleBarColor={props.titleBarColor}>
      {edit ? <EditModal setEdit={setEdit} /> : null}
      <div className="titleBar">
        {editTitleWindow ? (
          <>
            <input
              className="title"
              type="text"
              value={newTitle}
              onChange={(e) => handleEditTitle(e.target.value)}
            />
            <button className="evenWidth" onClick={acceptEditedTitle}>
              <img src={tick} alt="accept" />
            </button>
          </>
        ) : (
          <>
            <h3 className="title" onClick={() => setEditTitleWindow(true)}>
              {`WP${wpNumber} - ${title}`}
            </h3>
            <div className="info">
              <h3 className="resources">Resources</h3>
              <h3 className="days">Days</h3>
            </div>
          </>
        )}
      </div>
      <DragDropContext onDragEnd={handleMovingRow}>
        <Droppable droppableId={`workPackageNumber${index + 1}`}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {packData.map((task, index) => {
                return (
                  <Draggable
                    key={task.taskId}
                    draggableId={task.taskId}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        className="MonthContainer packBackground"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                      >
                        <GanttTaskRowInfo
                          packData={packData}
                          taskPackTitles={props.taskPackTitles}
                          provided={provided}
                          key={index}
                          task={task}
                        />
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
              <div className="bottom packBackground">
                <div>
                  {packData.length >= maxTasksPerPackage ? (
                    <Tippy
                      content={`Maximum ${maxTasksPerPackage} tasks per work package`}
                    >
                      <button className="evenWidth">
                        <img src={addGray} alt="add" />
                      </button>
                    </Tippy>
                  ) : (
                    <Tippy content="Add tasks">
                      <button className="evenWidth" onClick={handleAddNewRow}>
                        <img src={add} alt="add" />
                      </button>
                    </Tippy>
                  )}
                  <Tippy content="Delete work package (immediate)">
                    <button
                      onClick={() => handleRemovePack()}
                      className="evenWidth delete"
                    >
                      <img src={bin} alt="delete" />
                    </button>
                  </Tippy>
                </div>
                <div className="evenWidth">
                  <p className="days">{calculateDays()}</p>
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Container>
  );
}
export default GanttPackWork;
