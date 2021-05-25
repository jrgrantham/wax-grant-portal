import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "./costsStyling";
import { getTotalsByLeader } from "../../helpers";
import {
  assignToCategory,
  resetAssignments,
} from "../../store/entities/assignments";
import AssignmentRow from "./assignmentRow";
import Tippy from "@tippy.js/react";
import qMark from "../../images/qMark.png";
import { getWorkPackageIds } from "../../store/entities/tasks";

function AssignmentInfo() {
  console.log("AssignmentInfo");
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const totals = getTotalsByLeader(state);
  const workPackageIds = getWorkPackageIds(state);
  const leader = state.user.selectedLeader;
  const others = totals.other[leader];

  const hasMaterials = totals.object.materialsCost[leader] > 0;
  const hasTravel = totals.object.travelCost[leader] > 0;
  const hasCapex = totals.object.capexCost[leader] > 0;

  function assignAll(category) {
    dispatch(
      assignToCategory({
        leader,
        category,
        workPackageIds,
      })
    );
  }

  function reset() {
    dispatch(resetAssignments( {leader} ));
  }

  function assignAllButton(category, index) {
    const text = category.charAt(0) === 'o' ? 'other' : category;
    return (
      <div key={index} className="select title assign">
        <Tippy content={`Assign ${text} cost to all WPs`}>
          <button onClick={() => assignAll(category)} className="all">
            All
          </button>
        </Tippy>
      </div>
    );
  }

  return (
    <Container>
      <div className="assignmentTable">
        <div className="bottomLeftCorner">
          <button onClick={reset}>
            <h3>Reset assigned costs</h3>
          </button>
        </div>
        <div className="row titles leaderTabMargin">
          <p className="title assign"></p>
          {hasMaterials ? <p className="title assign">Materials</p> : null}
          {hasTravel ? <p className="title assign">Travel</p> : null}
          {hasCapex ? <p className="title assign">CapEx</p> : null}
          {others.map((other, index) => {
            return (
              <div key={index} className="title assign">
                <p>Other</p>
                <Tippy content={other.description}>
                  <div className="info">
                    <img src={qMark} alt="add" />
                  </div>
                </Tippy>
              </div>
            );
          })}
          <p className="title">Cost</p>
        </div>
        <div className="rows">
          {workPackageIds.map((pack, index) => {
            return (
              <AssignmentRow
                key={index}
                index={index}
                pack={pack}
                others={others}
                hasCapex={hasCapex}
                hasMaterials={hasMaterials}
                hasTravel={hasTravel}
              />
            );
          })}

          <div className="row">
            <p className="title assign"></p>
            {hasMaterials ? assignAllButton("materials") : null}
            {hasTravel ? assignAllButton("travel") : null}
            {hasCapex ? assignAllButton("capex") : null}
            {others.map((_, index) => {
              {
                const category = "other" + (index + 1);
                return assignAllButton(category, index);
              }
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
export default AssignmentInfo;
