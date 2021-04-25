import styled from "styled-components";
import { fontColorGrey, tableContentSideMargin, warningColor } from "../../helpers";

export const Container = styled.div`
  display: flex;
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
    margin-left: 5px;
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
    margin-left: 20px;
    display: flex;
    min-height: 25px;
    min-width: 25px;
    max-height: 25px;
    max-width: 25px;
  }
  .deleteIcon {
    width: 18px;
    padding-top: 4px;
    margin-left: 15px;
  }
  .addIcon {
    height: 25px;
    width: 25px;
    margin-top: 15px;
    margin-left: ${tableContentSideMargin};
  }
  button {
    color: white;
    border: none;
    padding: 0;
  }
`;
