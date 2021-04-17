import styled from "styled-components";

export const Container = styled.div`
  .rows {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 400px;
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
  .company {
  }
  .row {
    width: 46%;
  }
  .field {
    width: 100%;
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
