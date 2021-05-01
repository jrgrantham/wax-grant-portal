import React from "react";
import { store } from "../../store";
import { Container } from "./costsStyling";
import { getTotalsByLeader } from "../../helpers";

function AssignmentInfo() {
  const state = store.getState();
  const totals = getTotalsByLeader(state);
  const { percentWarn, percentOver } = state.entities.options.data;
  const { lead, pOne, pTwo, combined } = totals.object.totals;
  console.log(lead, pOne, pTwo, combined);

  function percent(index, value, total) {
    if (index < 7 && total && value) {
      const result = Math.round((value / total) * 100);
      const className =
        result > percentOver
          ? "percent over"
          : result > percentWarn
          ? "percent warn"
          : "percent ok";
      return <p className={className}>{result}%</p>;
    }
  }

  return (
    <Container>
      <div className="assignmentTable">
        <div className="row titles leaderTabMargin">
          <p className="title column center">WP</p>
          <p className="title column center">Materials</p>
          <p className="title column center">Travel</p>
          <p className="title column center">CapEx</p>
          <p className="title column center">Other 1</p>
          <p className="title column center">Other 2</p>
          <p className="title column center">Other 3</p>
          <p className="title column center">Other 4</p>
          <p className="title column center">Other 5</p>
          <p className="title column center">Cost</p>
        </div>
        <div className="rows">
          
        </div>
      </div>
    </Container>
  );
}
export default AssignmentInfo;
