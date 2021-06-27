import React, { useState } from "react";
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

function AdminModal(props) {
  const dispatch = useDispatch();
  const { title, list, defaultOption, listKey, defaultKey } = props;
  const [newValue, setNewValue] = useState("");

  window.addEventListener("keydown", checkCloseModal, false);

  function checkCloseModal(e) {
    console.log("listening");
    if (e.target.id === "background" || e.key === "Escape" || e.keycode === 27)
      closeModal();
  }

  function closeModal() {
    console.log("listening");
    window.removeEventListener("keydown", checkCloseModal);
    dispatch(updateUserSelection({ key: "showComponent", value: "" }));
  }

  function onChangeHandler(e) {
    const value = e.target.value;
    setNewValue(value);
  }

  const closeData = {
    key: "",
  };

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
            // placeholder="enter new value"
          />
          {newValue === "" ? null : (
            <div className="add image">
              <img src={add} alt="add" />
            </div>
          )}
        </div>
        {list.map((value, index) => {
          return (
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
                // onClick={() => removeItem(index)}
                className="delete image hiddenList"
                // className="delete image"
              >
                <img src={bin} alt="delete" />
              </button>
              {defaultKey ? (
                <button
                  // onClick={() => submitDefault(value)}
                  className={value === defaultOption ? "" : "hiddenList"}
                >
                  {/* <p>Default</p> */}
                  <div className="setDefault image">
                    <img src={tick} alt="accept" />
                  </div>
                </button>
              ) : null}
            </div>
          );
        })}
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
      margin: 5px 0 15px 0;
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
      margin-bottom: 5px;
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
