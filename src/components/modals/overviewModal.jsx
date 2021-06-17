import { store } from "../../store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../../store/user";
import styled from "styled-components";
import { costsFontColor, numberToCurrency } from "../../helpers";
import { getTotalsByCategory } from "../../helpers";
import Close from "../general/close";

function OverviewModal() {
  const dispatch = useDispatch();
  const showComponent = useSelector((state) => state.user.showComponent); // check this
  const breakdownComponent =
    useSelector((state) => state.user.selectedCostsOption) === "breakdown"; // check this
  const { leaders, percents, grants, matchFunding } = getTotalsByCategory(
    store.getState()
  );

  function showOverview() {
    if (showComponent === "") {
      dispatch(
        updateUserSelection({ key: "showComponent", value: "overview" })
      );
    } else dispatch(updateUserSelection({ key: "showComponent", value: "" }));
  }

  const offset =
    showComponent === "overview" && !breakdownComponent ? "0px" : "-190px";

  const closeData = {
    key: "showTaskEditModal",
  };

  return (
    <Container offset={offset}>
      {!breakdownComponent && showComponent === "" ? (
        <div className="aboveRight">
          <button onClick={showOverview}>
            <h3>Show Overview</h3>
          </button>
        </div>
      ) : null}
      <div className="close">
        <Close data={closeData} />
      </div>
      <div className="modalRow top">
        <h3 className="category">Overview</h3>
        <h3 className="heading">Partner 1</h3>
        <h3 className="heading">Partner 2</h3>
        <h3 className="heading">Partner 3</h3>
        <h3 className="heading">Total</h3>
      </div>
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
    </Container>
  );
}

export default OverviewModal;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  width: 100%;
  height: 190px;
  bottom: ${(props) => props.offset};
  /* bottom: 0; */
  transition: bottom 0.3s;
  background-color: rgba(230, 230, 230, 1);
  .aboveRight {
    position: absolute;
    padding: 20px 30px;
    top: -64px;
    /* left: 0; */
    button {
      border: none;
      color: gray;
    }
  }
  .close {
    position: absolute;
    top: 15px;
    right: 15px;
  }
  .modalRow {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px 20px;
    padding: 7px 80px;
  }
  .category {
    font-weight: bold;
    width: 150px;
  }
  .value,
  .heading {
    width: 120px;
    text-align: right;
  }
  .top {
    color: ${costsFontColor};
  }
`;
