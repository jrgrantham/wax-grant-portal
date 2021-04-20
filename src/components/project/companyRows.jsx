import React from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";
import { Container } from "./projectStyling";
import { setCompanyDefaults, updateLeaderInfo } from "../../store/projectData/project";
import { getCompanyDefaults } from "../../store/projectData/options";

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
    orgSizes,
    orgTypes,
    fundingLevels,
    matchFundingSources,
  } = useSelector((state) => state.options.data);

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

  const defaults = getCompanyDefaults(useSelector((state) => state));
  function applyDefaults() {
    dispatch(setCompanyDefaults({ defaults, leader }));
  }

  const data = {
    maxHeight: '550px'
  }

  return (
    <Container data={data}>
      <div className="rows company">
        <div className="bottomRow">
          <button onClick={applyDefaults}>
            <h3>Apply defaults</h3>
          </button>
        </div>


        <div className="row column">
          <div className="title">
            <p>Full Company Name</p>
          </div>
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


        <div className="row column">
          <div className="title">
            <p>Company Acronym</p>
          </div>
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


        <div className="row column">
          <div className="title">
            <p>Organisation Type</p>
          </div>
          <Tippy placement="top-start" content="Organisation type">
            <select
              value={organisationType}
              className="field"
              name="organisationType"
              onChange={onchangeHandler}
            >
              {orgTypes.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </Tippy>
        </div>


        <div className="row column">
          <div className="title">
            <p>Organisation Size</p>
          </div>
          <Tippy placement="top-start" content="Organisation size">
            <select
              value={organisationSize}
              className="field"
              name="organisationSize"
              onChange={onchangeHandler}
            >
              {orgSizes.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </Tippy>
        </div>


        <div className="row column">
          <div className="title">
            <p>Postcode for Project Work</p>
          </div>
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


        <div className="row column">
          <div className="title">
            <p>Turnover (last financial year)</p>
          </div>
          <Tippy placement="top-start" content="Turnover last financial year">
            <input
              type="number"
              value={turnover}
              className="field"
              name="turnover"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>


        <div className="row column">
          <div className="title">
            <p>Last financial year (MMM/YY)</p>
          </div>
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


        <div className="row column">
          <div className="title">
            <p>IP Lawyer Name</p>
          </div>
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


        <div className="row column">
          <div className="title">
            <p>Bank Holidays</p>
          </div>
          <Tippy placement="top-start" content="Bank holidays per year">
            <input
              type="number"
              value={bankHolidays}
              className="field"
              name="bankHolidays"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>


        <div className="row column">
          <div className="title">
            <p>Annual leave entitlement</p>
          </div>
          <Tippy placement="top-start" content="Annual leave entitlement">
            <input
              type="number"
              value={annualLeave}
              className="field"
              name="annualLeave"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>


        <div className="row column">
          <div className="title">
            <p>Current number of employees</p>
          </div>
          <Tippy placement="top-start" content="Current number of employees">
            <input
              type="number"
              value={numEmployees}
              className="field"
              name="numEmployees"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>


        <div className="row column">
          <div className="title">
            <p>Partner receives IUK Funding?</p>
          </div>
          <Tippy placement="top-start" content="Partner receives IUK Funding?">
            <input
              type="text"
              value={partnerFunding}
              className="field"
              name="partnerFunding"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>


        <div className="row column">
          <div className="title">
            <p>Funding level (%)</p>
          </div>
          <Tippy placement="top-start" content="Funding level (%)">
            <select
              type="text"
              value={fundingLevel}
              className="field"
              name="fundingLevel"
              onChange={onchangeHandler}
            >
              {fundingLevels.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </Tippy>
        </div>


        <div className="row column">
          <div className="title">
            <p>Product / Platform Name</p>
          </div>
          <Tippy placement="top-start" content="Match funding source">
            <select
              type="text"
              value={matchFundingSource}
              className="field"
              name="matchFundingSource"
              onChange={onchangeHandler}
            >
              {matchFundingSources.map((value, index) => {
                return (
                  <option key={index} value={value}>
                    {value}
                  </option>
                );
              })}
            </select>
          </Tippy>
        </div>


        <div className="row column">
          <div className="title">
            <p>Product / Platform Name</p>
          </div>
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
