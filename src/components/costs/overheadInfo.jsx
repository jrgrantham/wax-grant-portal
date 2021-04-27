import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotalDaysByPersonId } from "../../store/entities/allocations";
import { updateLeaderInfo } from "../../store/entities/project";
import { Container } from "./costsStyling";

function LabourInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const leader = state.user.selectedLeader;
  const { overheadRate } = state.entities.project.data[leader];
  const { days, cost } = getTotalDaysByPersonId(state)[leader];
  const rateOptions = state.entities.options.data.overheadRates;
  const overhead = Math.round((cost * overheadRate) / 100);

  function onChangeHandler(e) {
    const key = e.target.name;
    const value = e.target.value;
    dispatch(
      updateLeaderInfo({
        leader,
        key,
        value,
      })
    );
  }

  return (
    <Container>
      <div className="overheads">
        <div className="row titles leaderTabMargin">
          <p className="title labourNameRole">Overhead (%)</p>
          <p className="title labourCost">Cost (£)</p>
          {/* <p className="title labourDays">Days</p> */}
        </div>
        <div className="rows">
          <div className="row">
            <select
              value={overheadRate}
              name="overheadRate"
              onChange={onChangeHandler}
              className="field labourNameRole"
            >
              {rateOptions.map((rate, index) => {
                return (
                  <option key={index} value={rate}>
                    {rate}
                  </option>
                );
              })}
            </select>
            {/* <div className="total"> */}
            <p className="field display labourCost">{overhead}</p>
            {/* <p className="field display labourDays">test</p> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </Container>
  );
}
export default LabourInfo;
