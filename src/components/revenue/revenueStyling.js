import styled from "styled-components";
import { teamColor, questionColor, revenueStream, revenueTotal, revenueFontColor } from "../../helpers";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  .title {
    select {
      color: ${revenueFontColor};
      padding: 0;
    }
    .subtle {
      color: ${questionColor};
      /* font-weight: 500; */
    }
  }
  .revenueStream {
    background-color: ${revenueStream};
    padding: 15px;
    margin: 5px 10px;
    border-radius: 5px;
    .stream {
      color: ${questionColor};
      font-size: 12px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .revenueRow {
      display: flex;
    }
    input {
      background-color: transparent;
      border-bottom-color: red;
    }
  }
  .total {
    display: flex;
    flex-direction: column;
    background-color: ${revenueTotal};
  }
  .market {
    width: 180px;
  }
  .year {
    width: 80px;
  }
  .info {
    position: absolute;
    left: -35px;
    top: 1px;
  }
  img {
    height: 100%;
    width: 100%;
    margin: auto;
  }
  .profileButton {
    background-color: ${teamColor};
    padding: 5px 10px;
  }
  button {
    color: white;
    border: none;
    padding: 0;
  }
`;
