import React from "react";
import { store } from "../../store";
import { Container } from "./costsStyling";
import { getTotalsByLeader } from "../../helpers";
import AssignmentRow from "./assignmentRow";
import Tippy from "@tippy.js/react";
import qMark from "../../images/qMark.png";
import { getWorkPackageTitles } from "../../store/entities/tasks";

function AssignmentInfo() {
  const state = store.getState();
  const totals = getTotalsByLeader(state);
  const wps = getWorkPackageTitles(state);
  const leader = state.user.selectedLeader;
  const others = totals.other[leader];

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

  function categoryCost(category, index) {
    const value = Math.round(totals.object[category][leader]);
    return (
      <div key={index} className="field display assign">
        <p>{value}</p>
      </div>
    );
  }

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
          {wps.map((pack, index) => {
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
          <div className="row">
            <p className="title assign"></p>
            {categoryCost("materialsCost")}
            {categoryCost("travelCost")}
            {categoryCost("capexCost")}
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
