import { store } from "../../store";
import React from "react";
import styled from "styled-components";
import Close from "../general/close";
import { costsColor, numberToCurrency, wpInfoColor } from "../../helpers";
import { getTotalsByCategory } from "../../helpers";

function OverviewModal() {
  const { leaders, percents, grants, matchFunding } = getTotalsByCategory(
    store.getState()
  );

  return (
    <Container id="background">
      <div className="overview">
        <Close data={{ key: "showComponent" }} />
        <div className="modalRow top">
          <h3 className="category">Overview</h3>
          <h3 className="heading">Partner 1</h3>
          <h3 className="heading">Partner 2</h3>
          <h3 className="heading">Partner 3</h3>
          <h3 className="heading">Total</h3>
        </div>
        <div className="rows">
          <div className="modalRow">
            <p className="category">Project Cost</p>
            {leaders.map((value, index) => (
              <p key={index} className="value">
                {numberToCurrency(value)}
              </p>
            ))}
          </div>
          <div className="modalRow">
            <p className="category">Percentage share</p>
            {percents.map((value, index) => (
              <p key={index} className="value">
                {value}
              </p>
            ))}
          </div>
          <div className="modalRow">
            <p className="category">IUK Grant</p>
            {grants.map((value, index) => (
              <p key={index} className="value">
                {numberToCurrency(value)}
              </p>
            ))}
          </div>
          <div className="modalRow">
            <p className="category">Match Funding</p>
            {matchFunding.map((value, index) => (
              <p key={index} className="value">
                {numberToCurrency(value)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default OverviewModal;

const Container = styled.div`
  /* position: relative; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 65px;
  margin-top: 10px;
  .overview {
    position: relative;
    background-color: rgba(20, 20, 20, 0.1);
    border-radius: 6px;
  }
  .rows {
    padding: 10px 0;
    margin-bottom: 0;
    border-radius: 0 0 6px 6px;
  }
  .modalRow {
    background-color: transparent;
    /* height: 30px; */
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 20px;
  }
  .category {
    font-weight: bold;
    width: 150px;
  }
  .value,
  .heading {
    width: 100px;
    text-align: right;
  }
  .top {
    height: 40px;
    /* margin-bottom: 10px; */
    background-color: ${costsColor};
    color: white;
    padding: 0 20px;
    border-radius: 6px 6px 0px 0px;
  }
`;
