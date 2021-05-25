import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./costsStyling";
import { getTotalsByLeader } from "../../helpers";
import AssignmentRow from "./assignmentRow";
import Tippy from "@tippy.js/react";
import qMark from "../../images/qMark.png";
import {
  getWorkPackageIds,
} from "../../store/entities/tasks";

function AssignmentInfo() {
  console.log('AssignmentInfo');
  const state = useSelector((state) => state);
  const totals = getTotalsByLeader(state);
  const ids = getWorkPackageIds(state);
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
