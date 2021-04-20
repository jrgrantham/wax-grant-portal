import styled from "styled-components";
import {
  appTop,
  appWidth,
  tableContentSideMargin,
  tableInputUnderline,
  tableMinHeight,
  tableRightWidth,
} from "../../helpers";

export const TableContainer = styled.div`
  position: relative;
  top: ${appTop};
  margin: auto;
  max-width: ${appWidth};
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 750px) {
    padding: 0px;
  }
  .displayArea {
    position: relative;
    margin-bottom: 50px;
    display: flex;
    min-height: ${tableMinHeight};
    overflow: hidden;
    border-radius: 6px;
    box-shadow: 8px 8px 12px rgba(1, 1, 1, 0.5);
  }
  .content {
    width: ${tableRightWidth};
    background-color: white;
    display: flex;
    flex-direction: column;
  }
  .rows {
    margin-bottom: 25px;
  }
  .row {
    position: relative;
    min-height: 45px;
    margin-left: ${tableContentSideMargin};
    display: flex;
    align-items: center;
    &:hover .hidden {
      transition: opacity 0.3s;
      opacity: 1;
    }
  }
  .hidden {
    opacity: 0;
  }
  .field {
    margin-right: 20px;
    padding-left: 0;
    border-radius: 0;
    border-bottom: 2px solid ${tableInputUnderline};
    color: #606060;
    font-size: 16px;
    &:focus {
      border: none;
      border-bottom: 2px solid ${(props) => props.underline};
    }
  }
`;
