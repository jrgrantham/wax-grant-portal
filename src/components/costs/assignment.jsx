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
            <button onClick={() => resetCategory(category)} className="theme">
              None
            </button>
          </Tippy>
        ) : (
          <Tippy content={`Assign ${text} cost to all WPs`}>
            <button onClick={() => assignAll(category)} className="theme">
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
        <div className="row titles leaderTabMargin">
          <p className="title assign" />
          {status.has.materials ? (
            <p
              className={
                status.unassigned.materials
                  ? "title assign warn"
                  : "title assign"
              }
            >
              Materials
            </p>
          ) : null}
          {status.has.travel ? (
            <p
              className={
                status.unassigned.travel ? "title assign warn" : "title assign"
              }
            >
              Travel
            </p>
          ) : null}
          {status.has.capex ? (
            <p
              className={
                status.unassigned.capex ? "title assign warn" : "title assign"
              }
            >
              CapEx
            </p>
          ) : null}
          {others.map((other, index) => {
            return (
              <div
                key={index}
                className={
                  status.unassigned["other" + (index + 1)]
                    ? "title assign warn"
                    : "title assign"
                }
              >
                <p>Other</p>
                <Tippy content={other.description}>
                  <div className="info">
                    <img src={qMark} alt="add" />
                  </div>
                </Tippy>
              </div>
            );
          })}
          <p className="title cost">Cost</p>
        </div>
        <div className="rows">
          {workPackageIds.map((pack, index) => {
            return (
              <AssignmentRow
                key={index}
                index={index}
                pack={pack}
                others={others}
                hasCapex={status.has.capex}
                hasMaterials={status.has.materials}
                hasTravel={status.has.travel}
              />
            );
          })}

          <div className="row">
            <p className="title assign"></p>
            {status.has.materials ? assignAllButton("materials") : null}
            {status.has.travel ? assignAllButton("travel") : null}
            {status.has.capex ? assignAllButton("capex") : null}
            {others.map((_, index) => {
              {
                const category = "other" + (index + 1);
                return assignAllButton(category, index);
              }
            })}
          </div>
          {status.unassigned.any ? (
            <div className="warn message">
              {/* <div className="icon"><img src={warning} alt="warning"/></div> */}
              <p>All costs must be assigned to at least one work package</p>
              {/* <div className="icon"><img src={warning} alt="warning"/></div> */}
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
export default AssignmentInfo;
