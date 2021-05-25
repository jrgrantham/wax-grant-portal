import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "./costsStyling";
import { getTotalsByLeader, getWPStatus } from "../../helpers";
import {
  assignAllToCategory,
  assignNoneToCategory,
  resetAssignments,
} from "../../store/entities/assignments";
import AssignmentRow from "./assignmentRow";
import Tippy from "@tippy.js/react";
import qMark from "../../images/qMark.png";
import warning from "../../images/warning.png";
import { getWorkPackageIds } from "../../store/entities/tasks";

function AssignmentInfo() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const totals = getTotalsByLeader(state);
  const workPackageIds = getWorkPackageIds(state);
  const leader = state.user.selectedLeader;
  const status = getWPStatus(state)[leader];
  const others = totals.other[leader];
  const assignments = state.entities.assignments.data;

  function assignAll(category) {
    dispatch(
      assignAllToCategory({
        leader,
        category,
        workPackageIds,
      })
    );
  }
  function resetCategory(category) {
    dispatch(
      assignNoneToCategory({
        leader,
        category,
      })
    );
  }

  function reset() {
    dispatch(resetAssignments({ leader }));
  }

  function assignAllButton(category, index) {
    const assignedCount = assignments[leader][category].length;
    const wpCount = workPackageIds.length;
    const all = assignedCount === wpCount;
    const text = category.charAt(0) === "o" ? "other" : category;
    return (
      <div key={index} className="select title assign">
        {all ? (
          <Tippy content={`Remove ${text} cost from all WPs`}>
            <button
              onClick={() => resetCategory(category)}
              className="no"
            >
              None
            </button>
          </Tippy>
        ) : (
          <Tippy content={`Assign ${text} cost to all WPs`}>
            <button onClick={() => assignAll(category)} className="yes">
              All
            </button>
          </Tippy>
        )}
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
        {status.anyUnassigned ? (
          <div className="bottomMiddle">
            <Tippy content="All costs must be assigned to a work package">
              <img src={warning} alt="warning" />
            </Tippy>
          </div>
        ) : null}
        <div className="row titles leaderTabMargin">
          <p className="title assign"></p>
          {status.hasMaterials ? (
            <p className="title assign">Materials</p>
          ) : null}
          {status.hasTravel ? <p className="title assign">Travel</p> : null}
          {status.hasCapex ? <p className="title assign">CapEx</p> : null}
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
                hasCapex={status.hasCapex}
                hasMaterials={status.hasMaterials}
                hasTravel={status.hasTravel}
              />
            );
          })}

          <div className="row">
            <p className="title assign"></p>
            {status.hasMaterials ? assignAllButton("materials") : null}
            {status.hasTravel ? assignAllButton("travel") : null}
            {status.hasCapex ? assignAllButton("capex") : null}
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
