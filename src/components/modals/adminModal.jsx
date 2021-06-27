import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateTeamMember } from "../../store/entities/team";
import { teamColor, tableInputUnderline, settingsColor } from "../../helpers";
import { updateUserSelection } from "../../store/user";
import Close from "../../components/general/close";
import bin from "../../images/bin-grey.png";
import add from "../../images/add-grey.png";
import tick from "../../images/tick-grey.png";
import Tippy from "@tippy.js/react";
import { BiMenu } from "react-icons/bi";
import {
  addToGlobalList,
  removeFromGlobalList,
  setGlobalDefault,
  reorderGlobalList,
} from "../../store/entities/global";
import {
  addToProjectList,
  removeFromProjectList,
  setProjectDefault,
} from "../../store/entities/setup";

function AdminModal(props) {
  const dispatch = useDispatch();
  const { title, list, defaultOption, listKey, defaultKey, global } = props;
  const [newValue, setNewValue] = useState("");
  const closeData = { key: "" };

  window.addEventListener("keydown", checkCloseModal, false);

  function checkCloseModal(e) {
    console.log("listening");
    if (e.target.id === "background" || e.key === "Escape" || e.keycode === 27)
      closeModal();
  }

  function closeModal() {
    window.removeEventListener("keydown", checkCloseModal);
    dispatch(updateUserSelection({ key: "showComponent", value: "" }));
  }

  function onChangeHandler(e) {
    const value = e.target.value;
    setNewValue(value);
  }

  function acceptValue() {
    const result = newValue.trim();
    if (!result) return;
    if (global) dispatch(addToGlobalList({ key: listKey, value: result }));
    else dispatch(addToProjectList({ key: listKey, value: result }));
    setNewValue("");
  }

  function setDefault(value) {
    if (global) dispatch(setGlobalDefault({ key: defaultKey, value }));
    else dispatch(setProjectDefault({ key: defaultKey, value }));
  }

  function removeItem(index) {
    if (global) dispatch(removeFromGlobalList({ key: listKey, index }));
    else dispatch(removeFromProjectList({ key: listKey, index }));
  }

  function handleMovingRow(result) {
    if (!result.destination || result.destination.index === result.source.index)
      return;
    const newIndex = result.destination.index;
    const originalIndex = result.source.index;
    dispatch(reorderGlobalList({ key: listKey, newIndex, originalIndex }));
  }

  return (
    <Container id="background" onClick={checkCloseModal}>
      <div className="editWindow">
        <Close data={closeData} />
        <h3 className="title">{title}</h3>
        <div className="input">
          <input
            id={listKey}
            name={listKey}
            value={newValue}
            onChange={onChangeHandler}
          />
          {newValue === "" ? null : (
            <button onClick={acceptValue} className="add image">
              <img src={add} alt="add" />
            </button>
          )}
        </div>
        <DragDropContext onDragEnd={handleMovingRow}>
          <Droppable droppableId="team">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {list.map((value, index) => {
                  return (
                    <Draggable key={index} draggableId={value+index} index={index}>
                      {(provided) => (
                        <div
                          className="MonthContainer packBackground"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <div key={index} className="listRow">
                            <Tippy content="Drag to reorder rows">
                              <div
                                {...provided.dragHandleProps}
                                className="hiddenList grabHandle"
                              >
                                <BiMenu />
                              </div>
                            </Tippy>
                            <p>{value}</p>
                            <button
                              onClick={() => removeItem(index)}
                              className="delete image hiddenList"
                            >
                              <img src={bin} alt="delete" />
                            </button>
                            {defaultKey ? (
                              <button
                                onClick={() => setDefault(value)}
                                className={
                                  value === defaultOption ? "" : "hiddenList"
                                }
                              >
                                <div className="setProjectDefault image">
                                  <img src={tick} alt="accept" />
                                </div>
                              </button>
                            ) : null}
                          </div>
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
        {/* {list.map((value, index) => {
          return (
            <Draggable
              key={person.personId}
              draggableId={person.personId}
              index={index}
            >
              {(provided) => (
                <div
                  className="MonthContainer packBackground"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                >
                  <div key={index} className="listRow">
                    <Tippy content="Drag to reorder rows">
                      <div
                        // {...provided.dragHandleProps}
                        className="hiddenList grabHandle"
                      >
                        <BiMenu />
                      </div>
                    </Tippy>
                    <p>{value}</p>
                    <button
                      onClick={() => removeItem(index)}
                      className="delete image hiddenList"
                    >
                      <img src={bin} alt="delete" />
                    </button>
                    {defaultKey ? (
                      <button
                        onClick={() => setDefault(value)}
                        className={value === defaultOption ? "" : "hiddenList"}
                      >
                        <div className="setProjectDefault image">
                          <img src={tick} alt="accept" />
                        </div>
                      </button>
                    ) : null}
                  </div>
                </div>
              )}
            </Draggable>
          );
        })} */}
        {/* <div className="content" /> */}
      </div>
    </Container>
  );
}

export default AdminModal;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.6);
  z-index: 5;

  .editWindow {
    margin: 30px 0;
    position: relative;
    /* width: 365px; */
    border-radius: 6px;
    padding: 15px 30px;
    background-color: white;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .title {
      height: 30px;
    }
    .input {
      position: relative;
      display: flex;
      align-items: center;
      margin: 10px 0 20px 0;
    }
    input {
      width: 300px;
      position: relative;
      padding: 5px;
      border: 2px solid ${tableInputUnderline};
      min-height: 30px;
    }
    .listRow {
      position: relative;
      /* margin-left: 15px; */
      padding-bottom: 10px;
      width: 300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      /* border: 1px solid red; */
      &:hover .hiddenList {
        opacity: 1;
      }
    }
    .hiddenList {
      transition: opacity 0.3s;
      opacity: 0;
    }
    .image {
      max-height: 20px;
      max-width: 20px;
    }
    .add {
      position: absolute;
      right: -25px;
      /* top: 8px; */
    }
    .delete {
      position: absolute;
      right: -25px;
      max-width: 20px;
      max-height: 20px;
      padding: 0;
    }
    button {
      padding: 0;
    }
  }
`;
