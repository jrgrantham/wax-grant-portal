import { store } from "../../store";
import React from "react";
import styled from "styled-components";
import Close from "../general/close";
import { wpInfoColor } from "../../helpers";
import { getTotalsByCategory } from "../../helpers";

function OverviewModal() {
  const { leaders, percents, grants, matchFunding } = getTotalsByCategory(
    store.getState()
  );

  return (
    <Container id="background">
      <div className="editWindow">
        <Close data={{ key: "showComponent" }} />
        <div className="modalRow top">
          <h3 className="category">Project Overview</h3>
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
                {value}
              </p>
            ))}
          </div>
          <div className="modalRow">
            <p className="category">Share of Project</p>
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
                {value}
              </p>
            ))}
          </div>
          <div className="modalRow">
            <p className="category">Match Funding</p>
            {matchFunding.map((value, index) => (
              <p key={index} className="value">
                {value}
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
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(20, 20, 20, 0.6);
  z-index: 2;

  .editWindow {
    position: relative;
    max-height: 80vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 6px;
  }
  .rows {
    background-color: white;
    padding: 10px 0;
    border-radius: 0 0 6px 6px;
  }
  .modalRow {
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
  }
  .category {
    font-weight: bold;
    width: 200px;
  }
  .value,
  .heading {
    width: 100px;
    text-align: right;
  }
  .value {
    /* padding-right: 10px; */
  }
  .top {
    height: 50px;
    /* margin-bottom: 10px; */
    background-color: ${wpInfoColor};
    color: white;
    padding: 0 20px;
    border-radius: 6px 6px 0px 0px;
  }
`;
