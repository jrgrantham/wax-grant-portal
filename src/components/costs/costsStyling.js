import styled from "styled-components";
import {
  costsColor,
  fontColorGrey,
  navBackground,
  okColor,
  selectedNo,
  selectedYes,
  tableContentSideMargin,
  teamColor,
  warningColor,
} from "../../helpers";

export const Container = styled.div`
  display: flex;
  .small {
    display: flex;
    justify-content: flex-end;
    width: 65px;
    text-align: right;
    text-align-last: right;
  }
  .left {
    justify-content: flex-start;
    text-align: left;
    text-align-last: left;
  }
  .large {
    width: 200px;
  }
  .labourNameRole {
    width: 250px;
  }
  .labourCost {
    width: 70px;
    text-align: right;
    justify-content: flex-end;
  }
  .labourDays {
    width: 70px;
    text-align: right;
    justify-content: flex-end;
  }
  .labourOverutilised {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* width: 150px; */
    font-weight: 600;
    color: ${warningColor};
    margin-left: 15px;
  }
  .notes {
    margin-left: 15px;
    display: flex;
  }
  .note {
    margin-right: 5px;
    font-size: 14px;
    color: ${fontColorGrey};
  }
  .warning {
    margin-left: 40px;
    display: flex;
    min-height: 29px;
    min-width: 29px;
    max-height: 29px;
    max-width: 29px;
    border: 1px solid ${warningColor};
    border-radius: 6px;
    padding: 5px;
    cursor: pointer;
    img {
    }
  }
  .deleteIcon {
    position: absolute;
    right: -10px;
    width: 18px;
    padding-top: 4px;
    margin-left: 15px;
  }
  .addIcon {
    height: 25px;
    width: 25px;
    position: absolute;
    /* margin-top: 15px; */
    /* margin-left: ${tableContentSideMargin}; */
  }
  button {
    color: white;
    border: none;
    padding: 0;
  }

  .materialsDescription {
    width: 250px;
  }
  .materialsCost,
  .materialsQuantity,
  .materialsTotal {
    width: 70px;
    text-align: right;
    justify-content: flex-end;
  }
  .breakdownTable {
    width: 100%;
    .column.center {
      display: flex;
      justify-content: center;
    }
    .total {
      font-weight: bold;
    }
    .column {
      flex-grow: 1;
      flex-basis: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin-right: 20px;
      padding-right: 35px;
      max-width: 140px;
      /* border-right: 1px solid black */
    }
    .percent {
      font-size: 12px;
      font-weight: bold;
      background-color: lightgray;
      color: white;
      padding: 2px;
      border-radius: 6px;
      width: 60px;
      text-align: center;
    }
    .double {
      text-align: right;
    }
    .category {
      font-weight: bold;
      /* flex-basis: 20px; */
    }
    .value {
      width: 150px;
    }
    .ok {
      background-color: ${okColor};
    }
    .warn {
      background-color: orange;
    }
    .over {
      background-color: ${warningColor};
    }
    .empty {
      background-color: transparent;
    }
  }
  .assignmentTable {
    width: 100%;
    .row {
      margin-left: 0;
    }
    .assign {
      width: 64px;
      border-radius: 6px;
      text-align: center;
      justify-content: center;
    }
    .title {
      padding: 0;
      background-color: white;
    }
    .pack {
      text-align: right;
      padding-right: 5px;
      font-weight: bold;
    }
    button {
      padding: 2px 7px;
    }
    /* button.all {
      background-color: ${selectedYes};
    } */
    button.theme {
      background-color: ${costsColor};
      font-size: 12px;
      font-weight: bold;
    }
    button.yes {
      color: white;
      background-color: ${selectedYes};
    }
    button.no {
      color: white;
      background-color: ${selectedNo};
    }
    .warn {
      color: ${warningColor};
    }
    .message {
      display: flex;
      justify-content: center;
      margin-top: 20px;
      font-weight: bold;
      .icon {
        margin: 0 15px;
        height: 22px;
        width: 22px;
      }
    }
  }
`;
