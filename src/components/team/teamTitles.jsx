import React from "react";
import Tippy from "@tippy.js/react";
import qMark from "../../images/qMark.png";
// import "tippy.js/dist/tippy.css";
// import "react-tippy/dist/tippy.css";
import { useSelector } from "react-redux";

import { Container } from "./teamStyling";

function Titles() {
  const employmentType = useSelector((state) => state.user.selectedTeamOption);
  return (
    <Container>
      <div className="row titles leaderTabMargin">
        <div className="title name">
          <p>Name</p>
        </div>
        <div className="title acronym">
          <p>Acronym</p>
          <Tippy content="Identifies the team member on the Gantt Chart (red text indicates duplicate)">
            <div className="info">
              <img src={qMark} alt="add" />
            </div>
          </Tippy>
        </div>
        <div className="title role">
          <p>Role</p>
          <Tippy content="Project role (not necessarily job title)">
            <div className="info">
              <img src={qMark} alt="add" />
            </div>
          </Tippy>
        </div>
        {employmentType === "staff" ? (
          <div className="title salary">
            <p>Salary</p>
            <Tippy content="Gross salary including company NI, company pension contribution and life insurance (£)">
              <div className="info">
                <img src={qMark} alt="add" />
              </div>
            </Tippy>
          </div>
        ) : (
          <>
            <div className="title dayRate">
              <p>Day rate</p>
              <Tippy content="Day rate (£)">
                <div className="info">
                  <img src={qMark} alt="add" />
                </div>
              </Tippy>
            </div>
            <div className="title location">
              <p>Location</p>
            </div>
          </>
        )}
        <div className="delete"></div>
      </div>
    </Container>
  );
}
export default Titles;