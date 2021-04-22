import styled from "styled-components";
import {
  tableContentSideMargin,
  teamColor,
} from "../../helpers";

export const Container = styled.div`
  display: flex;
  .grabHandle {
    position: absolute;
    width: 20px;
    margin: 0px 5px 0px -23px;
    padding-top: 4px;
    cursor: move; /* fallback if grab cursor is unsupported */
    cursor: grab;
    cursor: -moz-grab;
    cursor: -webkit-grab;
    &:active {
      cursor: grabbing;
      cursor: -moz-grabbing;
      cursor: -webkit-grabbing;
    }
  }
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
