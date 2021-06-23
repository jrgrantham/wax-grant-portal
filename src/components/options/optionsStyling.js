import styled from "styled-components";
import { questionColor } from "../../helpers";

export const Container = styled.div`
  display: flex;
  
  .description {
    width: 300px;
  }
  .value {
    width: 70px;
    text-align: right;
    justify-content: flex-end;
  }
  .text {
    width: 340px;
    text-align: right;
    justify-content: flex-end;
  }
  .showButton {
    font-weight: bold;
    position: absolute;
    left: 240px;
  }
  .list {
    margin: 10px 20px;
    width: 330px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #f4f4f4;
    border-radius: 6px;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .listRow {
    position: relative;
    margin: 3px 10px 3px 10px;
    /* margin: 1px 40px; */
    width: 250px;
    /* height: 33px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:hover .hidden {
      transition: opacity 0.3s;
      opacity: 1;
    }
  }
  .left {
    display: flex;
    align-items: center;
  }
  button {
    min-width: 60px;
    font-size: 12px;
    background-color: white;
    color: ${questionColor};
    border: none;
  }
  .add {
    padding: 3px;
  }
  .imageButton {
    margin-right: 10px;
    background-color: transparent;
    max-height: 30px;
    max-width: 30px;
    min-width: 30px;
  }
  .selected {
    color: white;
    background-color: green;
  }
  .select {
    text-align: right;
    justify-content: flex-end;
  }
`;
