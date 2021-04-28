import styled from "styled-components";
import {
  tableContentSideMargin,
  teamColor,
} from "../../helpers";

export const Container = styled.div`
  display: flex;
  .name {
    width: 150px;
  }
  .acronym {
    width: 100px;
  }
  .duplicate {
    color: red;
  }
  .role {
    width: 150px;
  }
  .salary {
    width: 75px;
  }
  .dayRate {
    width: 90px;
  }
  .location {
    width: 75px;
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
    margin-left: ${tableContentSideMargin}
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
