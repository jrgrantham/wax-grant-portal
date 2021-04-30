import React from "react";
import { store } from "../../store";
import { Container } from "./costsStyling";
import { getTotalsByLeader } from "../../helpers";

function BreakdownInfo() {
  const state = store.getState();
  const totals = getTotalsByLeader(state);
  const { percentWarn, percentOver } = state.entities.options.data;
  const { lead, pOne, pTwo, combined } = totals.object.totals;
  console.log(lead, pOne, pTwo, combined);

  function percent(index, value, total) {
    if (index < 7 && total) {
      const result = Math.round((value / total) * 100);
      const className =
        result > percentOver
          ? "percent over"
          : result > percentWarn
          ? "percent warn"
          : "percent ok";
      return <p className={className}>{result}</p>;
    }
    // <p className={className}>{result}</p>
  }

  return (
    <Container>
      <div className="breakdownTable">
        <div className="row titles leaderTabMargin">
          <p className="title column category">Category</p>
          <p className="title column">Lead</p>
          <p className="title column">Partner 1</p>
          <p className="title column">Partner 2</p>
          <p className="title column">Total</p>
        </div>
        <div className="rows">
          {totals.array.map((row, index) => {
            return (
              <div key={index} className="row">
                <p className="field display column category">{row.category} </p>
                <div className="column content">
                  <p className="field display">{row.lead}</p>
                  {percent(index, row.lead, lead)}
                </div>
                <div className="column content">
                  <p className="field display">{row.pOne}</p>
                  {percent(index, row.pOne, pOne)}
                </div>
                <div className="column content">
                  <p className="field display">{row.pTwo}</p>
                  {percent(index, row.pTwo, pTwo)}
                </div>
                <div className="column content">
                  <p className="field display">{row.combined}</p>
                  {percent(index, row.combined, combined)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Container>
  );
}
export default BreakdownInfo;
