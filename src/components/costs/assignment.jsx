import React from "react";
import { store } from "../../store";
import { Container } from "./costsStyling";
import { getTotalsByLeader } from "../../helpers";
import AssignmentRow from './assignmentRow'

function AssignmentInfo() {
  const state = store.getState();
  const totals = getTotalsByLeader(state);
  const { lead, pOne, pTwo, combined } = totals.object.totals;
  console.log(lead, pOne, pTwo, combined);

  const wps = [1, 2, 3, 4, 5]

  return (
    <Container>
      <div className="assignmentTable">
        <div className="row titles leaderTabMargin">
          <p className="title assign">WP</p>
          <p className="title assign">Materials</p>
          <p className="title assign">Travel</p>
          <p className="title assign">CapEx</p>
          <p className="title assign grey">Other 1</p>
          <p className="title assign grey">Other 2</p>
          <p className="title assign grey">Other 3</p>
          <p className="title assign grey">Other 4</p>
          <p className="title assign grey">Other 5</p>
          <p className="title">Cost</p>
        </div>
        <div className="rows">
          {wps.map((pack, index) => {
            return <AssignmentRow key={index} index={index} pack={pack}/>
          })}
        </div>
      </div>
    </Container>
  );
}
export default AssignmentInfo;
