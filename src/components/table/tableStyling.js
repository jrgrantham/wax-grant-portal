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
  .titles.row {
    min-height: 0;
  }
  .title {
    display: flex;
    margin-right: 20px;
    font-weight: bold;
    color: ${(props) => props.data.backgroundColor};
  }
  .info {
    margin: 0;
    margin-left: 7px;
    width: 16px;
    height: 16px;
  }
  .rows {
    margin-bottom: 25px;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: ${props => props.data.maxHeight};
  }
  .row {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 45px;
    margin-left: ${tableContentSideMargin};
    &:hover .hidden {
      transition: opacity 0.3s;
      opacity: 1;
    }
  }
  .hidden {
    opacity: 0;
  }
  .column {
    width: calc(50% - ${tableContentSideMargin});
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 15px;
    .field {
      width: 95%;
    }
    .month {
      width: 40px;
    }
    .year {
      width: 55px;
    }
    .length {
      width: 35px;
    }
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
      border-bottom: 2px solid ${(props) => props.data.backgroundColor};
    }
  }
  .applyDefaults {
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: flex-end;
    padding: 20px 30px;
    button {
      border: none;
      color: gray;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
`;