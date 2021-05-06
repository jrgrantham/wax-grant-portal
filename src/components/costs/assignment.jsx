import React from "react";
import { store } from "../../store";
import { Container } from "./costsStyling";
import { getTotalsByCategory, getTotalsByLeader } from "../../helpers";
import AssignmentRow from "./assignmentRow";
import Tippy from "@tippy.js/react";
import qMark from "../../images/qMark.png";
import { getWorkPackageTitles } from "../../store/entities/tasks";

function AssignmentInfo() {
  const state = store.getState();
  const totals2 = getTotalsByLeader(state)
  const wps = getWorkPackageTitles(state);
  const leader = state.user.selectedLeader
  // const test = Math.round(totals2.labour[leader].cost)
  console.log(totals2.object);

  function assignAll() {
    return (
      <div className="selectAll title assign">
        <Tippy content="Select all">
          <button className="all">Y</button>
        </Tippy>
        <Tippy content="Select none">
          <button className="none">N</button>
        </Tippy>
      </div>
    );
  }

  function categoryCost(category) {
    const value = Math.round(totals2.object[category][leader])
    return <div className="field display assign">
      <p>{value}</p>
    </div>
  }

  return (
    <Container>
      <div className="assignmentTable">
        <div className="row titles leaderTabMargin">
          <p className="title assign"></p>
          <p className="title assign">Materials</p>
          <p className="title assign">Travel</p>
          <p className="title assign">CapEx</p>
          <div className="title assign grey">
            <p>Other</p>
            <Tippy content="Description here">
              <div className="info">
                <img src={qMark} alt="add" />
              </div>
            </Tippy>
          </div>
          <div className="title assign grey">
            <p>Other</p>
            <Tippy content="Description here">
              <div className="info">
                <img src={qMark} alt="add" />
              </div>
            </Tippy>
          </div>
          <div className="title assign grey">
            <p>Other</p>
            <Tippy content="Description here">
              <div className="info">
                <img src={qMark} alt="add" />
              </div>
            </Tippy>
          </div>
          <div className="title assign grey">
            <p>Other</p>
            <Tippy content="Description here">
              <div className="info">
                <img src={qMark} alt="add" />
              </div>
            </Tippy>
          </div>
          <div className="title assign grey">
            <p>Other</p>
            <Tippy content="Description here">
              <div className="info">
                <img src={qMark} alt="add" />
              </div>
            </Tippy>
          </div>
          <p className="title">Cost</p>
        </div>
        <div className="rows">
          {wps.map((pack, index) => {
            return <AssignmentRow key={index} index={index} pack={pack} />;
          })}
          <div className="row">
            <p className="title assign"></p>
            {assignAll()}
            {assignAll()}
            {assignAll()}
            {assignAll()}
            {assignAll()}
            {assignAll()}
            {assignAll()}
            {assignAll()}
          </div>
          <div className="row">
            <p className="title assign"></p>
            {categoryCost('materialsCost')}
            {categoryCost('travelCost')}
            {categoryCost('capexCost')}
            {assignAll()}
            {assignAll()}
            {assignAll()}
            {assignAll()}
            {assignAll()}
          </div>
        </div>
      </div>
    </Container>
  );
}
export default AssignmentInfo;
