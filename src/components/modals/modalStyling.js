import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(20, 20, 20, 0.6);
  z-index: 3;

  .editWindow {
    position: relative;
    /* width: 450px; */
    padding: 20px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    background-color: white;
    border: 1px solid black;
    border-radius: 8px;
    /* overflow: hidden; */
    label {
      font-weight: 600;
      z-index: 1;
      /* margin-left: 10px; */
    }
  }
  .errorMessage {
    width:100%;
    text-align: right;
    font-size: 12px;
    color: red;
  }

  .formField {
    display: flex;
    /* justify-content: space-between; */
    align-items: flex-start;
    flex-direction: column;
    width: 95%;
    height: 55px;
    margin-bottom: 5px;
    margin-right: 10px;
  }
  .bottomButtons {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    /* margin-bottom: 10px; */
    /* padding-right: 5px; */
  }
  .image {
    width: 20px;
    height: 20px;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  button {
    padding-left: 10px;
    padding-right: 10px;
    cursor: pointer;
  }
  select,
  input {
    width: 250px;
    border: 1px solid #d1d1d1;
    margin-right: 0;
  }
  img {
    height: 100%;
    width: 100%;
  }
  /* .leftB {
    margin-right: 10px;
  } */
`;
