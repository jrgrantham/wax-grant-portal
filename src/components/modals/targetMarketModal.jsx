import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updateTeamMember } from "../../store/entities/team";
import close from "../../images/close-grey.png";
import { teamColor, tableInputUnderline } from "../../helpers";

function TargetMarketModal(props) {
  const dispatch = useDispatch();
  const { name } = props;

  window.addEventListener("keydown", checkCloseModal, false);

  function checkCloseModal(e) {
    console.log("listening");
    if (e.target.id === "background" || e.key === "Escape" || e.keycode === 27)
      closeModal();
  }

  function closeModal() {
    console.log('listening');
    window.removeEventListener("keydown", checkCloseModal);
    props.setShowProfile(false);
  }

  function onChangeHandler(e) {
    const key = e.target.name;
    const value = e.target.value;
    dispatch(
      updateTeamMember({
        // personId: person.personId,
        key,
        value,
      })
    );
  }

  return (
    <Container id="background" onClick={checkCloseModal}>
      <div className="editWindow">
        <button onClick={closeModal} className="close">
          <img src={close} alt="close" />
        </button>
        <div className="left">
          <div className="title" />
          <label className="label" htmlFor="url">
            <h3>Website</h3>
          </label>
          <label className="label" htmlFor="url">
            <h3>Profile</h3>
          </label>
        </div>
        <div className="right">
          <h3 className="title">{name}</h3>
          <input
            id="website"
            name="website"
            value={0}
            onChange={onChangeHandler}
            className="input"
          />
          <textarea
            id='comments'
            name="profile"
            value={0}
            onChange={onChangeHandler}
            className="input"
          />
        </div>
        {/* <div className="content" /> */}
      </div>
    </Container>
  );
}

export default TargetMarketModal;

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
  z-index: 2;

  .editWindow {
    position: relative;
    min-height: 200px;

    display: flex;
    justify-content: space-between;

    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
    overflow: hidden;
    .content {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      width: 100px;
      height: 100%;
    }
    .left,
    .right {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 15px;
    }
    .left {
      align-items: flex-end;
      background-color: ${teamColor};
    }
    .right {
      align-items: center;
    }
    .title {
      height: 30px;
    }
    .input {
      min-width: 350px;
      max-width: 350px;
      position: relative;
      padding: 5px;
      margin: 0;
      margin-top: 5px;
      border: 2px solid ${tableInputUnderline};
      min-height: 30px;
    }
    .label {
      display: flex;
      align-items: center;
      min-height: 30px;
      margin-top: 5px;
      border: none;
      color: white;
      min-width: 0px;
    }
    .close {
      position: absolute;
      top: 15px;
      right: 15px;
      height: 20px;
      width: 20px;
    }
    textarea {
      height: 200px;
    }
  }
`;
