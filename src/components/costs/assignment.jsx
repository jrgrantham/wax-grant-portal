import React from "react";
import { store } from "../../store";
import { Container } from "./costsStyling";
import { getTotalsByLeader, getWPCost } from "../../helpers";
import AssignmentRow from "./assignmentRow";
import Tippy from "@tippy.js/react";
import qMark from "../../images/qMark.png";
import {
  getWorkPackageIds,
  getWorkPackageTitles,
} from "../../store/entities/tasks";
import { getWorkPackageLabourCost } from "../../store/entities/allocations";

function AssignmentInfo() {
  const state = store.getState();
  const totals = getTotalsByLeader(state);
  const titles = getWorkPackageTitles(state);
  const ids = getWorkPackageIds(state);
  const leader = state.user.selectedLeader;
  const others = totals.other[leader];
  const wpCounts = state.entities.assignments.data[leader];

  const workPackageCost = getWorkPackageLabourCost(state);
  // console.log(workPackageCost);
  // console.log("no of packs for dividing costs:", ids.length);

  const hasMaterials = totals.object.materialsCost[leader] > 0;
  const hasTravel = totals.object.travelCost[leader] > 0;
  const hasCapex = totals.object.capexCost[leader] > 0;

  function assignAll(other, index) {
    return (
      <div key={index} className="selectAll title assign">
        <Tippy content="Select all">
          <button className="all">Y</button>
        </Tippy>
        <Tippy content="Select none">
          <button className="none">N</button>
        </Tippy>
      </div>
    );
  }

  function categoryCost(categoryCost, category) {
    const value = Math.round(totals.object[categoryCost][leader]);
    return (
      <div className="field display assign">
        <p>£{value / wpCounts[category].length}/ea</p>
      </div>
    );
  }

  function otherCost(other, index) {
    const value = Math.round(other.cost);
    return (
      <div key={index} className="field display assign">
        <p>{value}</p>
      </div>
    );
  }

  const test = getWPCost(state)
  console.log(test);

  return (
    <Container>
      <div className="assignmentTable">
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
          {ids.map((pack, index) => {
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
            {hasMaterials ? assignAll("materialsCost") : null}
            {hasTravel ? assignAll("travelCost") : null}
            {hasCapex ? assignAll("capexCost") : null}
            {others.map((other, index) => {
              {
                return assignAll(other, index);
              }
            })}
          </div>
        </div>
      </div>
    </Container>
  );
}
export default AssignmentInfo;
