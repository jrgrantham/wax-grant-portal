import styled from "styled-components";
import { tableContentSideMargin } from "../../helpers";
import {projectColor} from '../../helpers'

export const Container = styled.div`
  .rows {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: ${props => props.data.maxHeight};
  }
  .bottomRow {
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
  .column {
    width: calc(50% - ${tableContentSideMargin});
    display: flex;
    flex-direction: column;
    /* justify-content: flex-start; */
    align-items: flex-start;
    margin-bottom: 15px;
  }
  .title {
    display: flex;
    font-weight: bold;
    color: ${projectColor}
  }
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
  .info {
    position: absolute;
    width: 16px;
    height: 16px;
    left: -23px;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
