import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { generateArray, numberToCurrency } from "../../helpers";
import { getTotalDays } from "../../store/entities/allocations";
import { updateLeaderInfo } from "../../store/entities/project";
import { Container } from "./costsStyling";

function OverheadInfo() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const leader = state.user.selectedLeader;
  const { overheadRate } = state.entities.project.data[leader];
  const { cost } = getTotalDays(state)[leader];
  const {
    overheadRateMin,
    overheadRateMax,
    overheadRateInc,
  } = state.entities.global.data;
  const overhead = Math.round((cost * overheadRate) / 100);
  const formattedValue = numberToCurrency(overhead);

  const rateOptions = generateArray(
    overheadRateMin,
    overheadRateMax,
    overheadRateInc
  );

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
          <p className="title labourCost">Cost</p>
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
            <div className="total">
              <p className="field display labourCost">{formattedValue}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default OverheadInfo;
