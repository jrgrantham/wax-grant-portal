import React from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";
import { Container } from "./projectStyling";
import { updateLeaderInfo } from "../../store/projectData/project";

function CompanyRows() {
  const leader = useSelector((state) => state.user.selectedLeader);
  const dispatch = useDispatch();

  function onchangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    console.log(value);
    value = value.slice(0, 50);
    dispatch(updateLeaderInfo({ leader, key, value }));
  }

  const {
    companyName,
    companyAcronym,
    organisationType,
    organisationSize,
    postcode,
    turnover,
    lastYear,
    lawyer,
    bankHolidays,
    annualLeave,
    numEmployees,
    partnerFunding,
    fundingLevel,
    matchFundingSource,
    investorName,
  } = useSelector((state) => state.project.data[leader]);

  return (
    <Container>
      <div className="rows company">
        <div className="row">
          <Tippy placement="top-start" content="Full company name">
            <input
              type="text"
              value={companyName}
              className="field"
              name="companyName"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Company acronym">
            <input
              type="text"
              value={companyAcronym}
              className="field"
              name="companyAcronym"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Organisation type">
            <input
              type="text"
              value={organisationType}
              className="field"
              name="organisationType"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Organisation size">
            <input
              type="text"
              value={organisationSize}
              className="field"
              name="organisationSize"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Postcode for project work">
            <input
              type="text"
              value={postcode}
              className="field"
              name="postcode"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Turnover last financial year">
            <input
              type="text"
              value={turnover}
              className="field"
              name="turnover"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Last financial year (MMM/YY)">
            <input
              type="text"
              value={lastYear}
              className="field"
              name="lastYear"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="IP lawyer name">
            <input
              type="text"
              value={lawyer}
              className="field"
              name="lawyer"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Bank holidays per year">
            <input
              type="text"
              value={bankHolidays}
              className="field"
              name="bankHolidays"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Annual leave entitlement">
            <input
              type="text"
              value={annualLeave}
              className="field"
              name="annualLeave"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Current number of employees">
            <input
              type="text"
              value={numEmployees}
              className="field"
              name="numEmployees"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="partner receives IUK funding?">
            <input
              type="text"
              value={partnerFunding}
              className="field"
              name="partnerFunding"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Funding level (%)">
            <input
              type="text"
              value={fundingLevel}
              className="field"
              name="fundingLevel"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Match funding source">
            <input
              type="text"
              value={matchFundingSource}
              className="field"
              name="matchFundingSource"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Investor name (if applicable)">
            <input
              type="text"
              value={investorName}
              className="field"
              name="investorName"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
      </div>
    </Container>
  );
}
export default CompanyRows;
