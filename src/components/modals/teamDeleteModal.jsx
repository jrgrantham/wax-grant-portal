import React from "react";
import styled from "styled-components";

function DeleteModal(props) {
  const { name, deletePerson, setConfirmDelete } = props;

  function checkCloseModal(e) {
    console.log("listening");
    if (e.target.id === "background" || e.key === "Escape" || e.keycode === 27)
      closeModal();
  }

  function closeModal() {
    console.log("listening");
    window.removeEventListener("keydown", checkCloseModal);
    props.setShowProfile(false);
  }

  return (
    <Container id="background" onClick={checkCloseModal}>
      <div className="modal">
        <h3>{`Are you sure you want to delete ${name}?`}</h3>
        <p>All associated data will be lost</p>
        <div className="buttons">
          <button onClick={() => setConfirmDelete(false)} className="cancel">
            Cancel
          </button>
          <button onClick={deletePerson} className="confirm">Confirm</button>
        </div>
      </div>
      {/* <div className="content" /> */}
    </Container>
  );
}

export default DeleteModal;

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

  .modal {
    flex-direction: column;
    position: relative;
    height: 200px;

    display: flex;
    justify-content: space-evenly;
    align-items: center;

    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
    padding: 30px 70px;
    overflow: hidden;
    .buttons {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
    .cancel {
      padding: 5px 10px;
      background-color: green;
      margin-right: 10px;
    }
    .confirm {
      padding: 5px 10px;
      background-color: red;
    }
  }
`;
