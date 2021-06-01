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

  console.log(others[0]);

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

  // function reset() {
  //   dispatch(resetAssignments({ leader }));
  // }

  function assignAllButton(category, index) {
    const assignedCount = assignments[leader][category].length;
    const wpCount = workPackageIds.length;
    const all = assignedCount === wpCount;
    const text = category.charAt(0) === "o" ? "other" : category;
    return (
      <div key={index} className="select title assign hidden">
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

  function heading(title, index, description) {
    let key = title.toLowerCase();
    if (title === "Other") key = key + (index + 1);
    const hasCost = status.has[key];
    const unassigned = status.unassigned[key];
    if (hasCost) {
      return (
        <div
          key={index}
          className={unassigned ? "title assign warn" : "title assign"}
        >
            <p>{title}</p>
            {title === "Other" ? (
              <Tippy content={description}>
                <div className="info">
                  <img src={qMark} alt="add" />
                </div>
              </Tippy>
            ) : null}
          {unassigned ? (
            <Tippy content="Costs must be assigned to a work package">
              <div className="unassigned">
                <img src={warning} alt="warning" />
              </div>
            </Tippy>
          ) : null}
        </div>
      );
    }
  }

  return (
    <Container>
      <div className="assignmentTable">
        <div className="row titles leaderTabMargin">
          <p className="title assign" />
          {heading("Materials")}
          {heading("Travel")}
          {heading("CapEx")}
          {others.map((other, index) => {
            return heading("Other", index, other.description);
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
        </div>
      </div>
    </Container>
  );
}
export default AssignmentInfo;
