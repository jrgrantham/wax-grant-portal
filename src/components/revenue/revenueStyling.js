import styled from "styled-components";
import {
  teamColor,
  questionColor,
  revenueStream,
  revenueTotal,
  revenueFontColor,
  tableContentSideMargin,
} from "../../helpers";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    height: 21px;
    align-items: flex-start;
    justify-content: flex-end;
    select {
      background-color: transparent;
      color: ${revenueFontColor};
      padding: 0;
    }
    .subtle {
      color: ${questionColor};
      /* font-weight: 500; */
    }
    .dropdown {
      right: -14px;
      bottom: 11px;
      max-width: 12px;
    }
  }
  .revenueStream {
    background-color: ${revenueStream};
    // to equal the margin left variable of 30px, 15 + 15
    padding: 10px 20px;
    margin: 5px 10px;
    border-radius: 5px;
    .stream {
      color: ${questionColor};
      font-size: 12px;
      font-weight: bold;
      margin-right: 10px;
      // market width + 5 x year width + margins
      /* width: 600px; */
    }
    .revenueRow {
      display: flex;
      align-items: center;
      min-height: 30px;
    }
    input {
      background-color: transparent;
      /* border-bottom-color: red; */
    }
    &:hover .hidden {
      opacity: 1;
    }
  }
  .editTitle {
    /* position: absolute; */
    height: 15px;
    width: 15px;
    /* margin-bottom: 3px; */
    /* left: 120px; */
    /* bottom: 12px; */
  }
  .streamTitle {
    margin-bottom: 5px;
    display: flex;
    justify-content: flex-start;
    /* align-items: center; */
  }
  .addIcon {
    height: 25px;
    width: 25px;
    margin-top: 15px;
    margin-left: ${tableContentSideMargin};
  }
  .revenueTotal {
    /* display: flex; */
    /* flex-direction: column; */
    margin-top: 20px;
    background-color: ${revenueTotal};
  }
  .market {
    width: 150px;
  }
  .year {
    width: 70px;
    text-align: right;
  }
  .right {
    margin-right: 0px;
  }
  .info {
    position: absolute;
    left: 0;
    margin-left: 0;
  }
  img {
    height: 100%;
    width: 100%;
    margin: auto;
  }
  .textButton {
    background-color: ${teamColor};
    padding: 5px 10px;
    padding: 5px 10px;
  }

  .marginLeft {
    margin-left: 20px;
  }
  .hiddenInput {
    display: flex;
    align-items: center;
    height: 35px;
    background-color: green;
    border-radius: 6px;
    position: absolute;
    right: 10px;
    button {
      margin-right: 10px;
    }
    input {
      border: none;
      background-color: white;
      border-radius: 6px;
      margin-left: 10px;
      margin-right: 10px;
      padding-right: 10px;
    }
  }
  button {
    color: white;
    border: none;
    padding: 0;
  }
  .deleteIcon {
    width: 18px;
    padding-top: 4px;
    margin-left: 15px;
  }
  .streamDelete {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 18px;
    cursor: pointer;
  }
`;
