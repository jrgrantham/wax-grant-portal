import styled from "styled-components";
import { fontColorGrey, tableContentSideMargin, warningColor } from "../../helpers";

export const Container = styled.div`
  display: flex;
  .small {
    display: flex;
    justify-content: flex-end;
    width: 65px;
    text-align: right;
    text-align-last: right;
  }
  .large {
    width: 200px;
  }
  .labourNameRole {
    width: 250px;
  }
  .labourCost {
    width: 60px;
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
  .materialsCost, .materialsQuantity, .materialsTotal {
    width: 70px;
    text-align: right;
    justify-content: flex-end;
  }
  `;
