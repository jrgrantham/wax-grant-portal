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
  .double {
    width: 200px;
    justify-content: flex-start;
    text-align: left;
  }
  .text {
    width: 340px;
    text-align: right;
    justify-content: flex-end;
  }
  .showButton {
    font-weight: bold;
  }
  .list {
    margin: 10px 20px;
    width: 330px;
    padding-top: 10px;
    padding-bottom: 10px;
    background-color: #f4f4f4;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .alignLeft {
    text-align: left;
    justify-content: flex-start;
  }
  .left {
    display: flex;
    align-items: center;
  }
  button {
    font-size: 12px;
    background-color: white;
    color: ${questionColor};
    border: none;
  }
  .imageButton {
    margin-right: 10px;
    background-color: transparent;
    max-height: 30px;
    max-width: 30px;
    min-width: 30px;
  }
  .select {
    text-align: right;
    justify-content: flex-end;
  }
`;
