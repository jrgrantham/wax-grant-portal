import styled from "styled-components";
import { costsColor, tableContentSideMargin } from "../../helpers";

export const Container = styled.div`
  display: flex;
  
  .description {
    width: 250px;
  }
  .value {
    width: 70px;
    text-align: right;
    justify-content: flex-end;
  }
  .showButton {
    position: absolute;
    left: 190px;
  }
  .list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .listRow {
    position: relative;
    margin-left: ${tableContentSideMargin};
    /* margin: 1px 40px; */
    width: 250px;
    height: 33px;
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
    background-color: grey;
    border: none;
    color: white;
  }
  .add {
    padding: 0;
  }
  .imageButton {
    margin-right: 10px;
    background-color: transparent;
    max-height: 30px;
    max-width: 30px;
    min-width: 30px;
  }
  .selected {
    background-color: green;
  }
`;
