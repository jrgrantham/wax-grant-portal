import React from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";
import qMark from "../../images/qMark.png";
import { Container } from "./detailsStyling";
import {
  setCompanyDefaults,
  updateLeaderInfo,
} from "../../store/entities/project";
import { getCompanyDefaults } from "../../store/entities/options";
import { isNumberKey } from "../../helpers";
// onKeyDown={(e) => isNumberKey(e)}

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
    months,
    years,
  } = useSelector((state) => state.entities.options.data);

  const {
    companyName,
    companyAcronym,
    organisationType,
    organisationSize,
    postcode,
    turnover,
    lastFinancialYear,
    lastFinancialMonth,
    lawyer,
    bankHolidays,
    annualLeave,
    numEmployees,
    partnerFunding,
    fundingLevel,
    matchFundingSource,
    investorName,
  } = useSelector((state) => state.entities.project.data[leader]);

  const defaults = getCompanyDefaults(useSelector((state) => state));
  function applyDefaults() {
    dispatch(setCompanyDefaults({ defaults, leader }));
  }

  const data = {
    maxHeight: "550px",
  };

  return (
    <Container data={data}>
      <div className="rows company">
        <div className="bottomRightCorner">
          <button onClick={applyDefaults}>
            <h3>Apply defaults</h3>
          </button>
        </div>

        <div className="row column">
          <div className="title">
            <p>Full Company Name</p>
          </div>
          <input
            type="text"
            value={companyName}
            className="field"
            name="companyName"
            onChange={onchangeHandler}
          />
        </div>

        <div className="row column">
          <div className="title">
            <p>Company Acronym</p>
          </div>
          <input
            type="text"
            value={companyAcronym}
            className="field"
            name="companyAcronym"
            onChange={onchangeHandler}
          />
        </div>

        <div className="row column">
          <div className="title">
            <p>Organisation Type</p>
          </div>
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
        </div>

        <div className="row column">
          <div className="title">
            <p>Organisation Size</p>
          </div>
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
        </div>

        <div className="row column">
          <div className="title">
            <p>Postcode</p>
            <Tippy content="Postcode for Project Work">
              <div className="info">
                <img src={qMark} alt="info" />
              </div>
            </Tippy>
          </div>
          <input
            type="text"
            value={postcode}
            className="field"
            name="postcode"
            onChange={onchangeHandler}
          />
        </div>

        <div className="row column">
          <div className="title">
            <p>Turnover</p>
            <Tippy content="Turnover last financial year">
              <div className="info">
                <img src={qMark} alt="info" />
              </div>
            </Tippy>
          </div>
          <input
            type="text"
            value={turnover}
            className="field"
            name="turnover"
            onKeyDown={(e) => isNumberKey(e)}
            onChange={onchangeHandler}
          />
        </div>

        {/* <div className="row column">
          <div className="title">
            <p>Last financial year (MMM/YY)</p>
          </div>
          <input
            type="text"
            value={lastYear}
            className="field"
            name="lastYear"
            onChange={onchangeHandler}
          />
        </div> */}

        <div className="row column">
          <div className="title">
            <p>Last financial year</p>
            {/* <Tippy content="Check IUK competition website for guidance on project lengths">
              <div className="info">
                <img src={qMark} alt="info" />
              </div>
            </Tippy> */}
          </div>
          <div className="projectStart">
            {/* <Tippy placement="top-start" content="Month project starts"> */}
            <select
              className="field month"
              name="lastFinancialMonth"
              value={lastFinancialMonth}
              onChange={onchangeHandler}
            >
              {months.map((month, index) => {
                return (
                  <option key={index} value={month}>
                    {month}
                  </option>
                );
              })}
            </select>
            {/* </Tippy> */}
            {/* <Tippy content="Year project starts"> */}
            <select
              className="field year"
              name="lastFinancialYear"
              value={lastFinancialYear}
              onChange={onchangeHandler}
            >
              {years.map((year, index) => {
                return (
                  <option key={index} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
            {/* </Tippy> */}
          </div>
        </div>

        <div className="row column">
          <div className="title">
            <p>IP Lawyer Name</p>
          </div>
          <input
            type="text"
            value={lawyer}
            className="field"
            name="lawyer"
            onChange={onchangeHandler}
          />
        </div>

        <div className="row column">
          <div className="title">
            <p>Bank Holidays</p>
          </div>
          <input
            type="text"
            value={bankHolidays}
            className="field"
            onKeyDown={(e) => isNumberKey(e)}
            name="bankHolidays"
            onChange={onchangeHandler}
          />
        </div>

        <div className="row column">
          <div className="title">
            <p>Annual Leave Entitlement</p>
          </div>
          <input
            type="text"
            value={annualLeave}
            className="field"
            onKeyDown={(e) => isNumberKey(e)}
            name="annualLeave"
            onChange={onchangeHandler}
          />
        </div>

        <div className="row column">
          <div className="title">
            <p>Current Number of Employees</p>
          </div>
          <input
            type="text"
            value={numEmployees}
            className="field"
            name="numEmployees"
            onKeyDown={(e) => isNumberKey(e)}
            onChange={onchangeHandler}
          />
        </div>
        {/* Funding Level –  */}
        {/* Match Funding Source –  */}

        <div className="row column">
          <div className="title">
            <p>Partner Receives IUK Funding?</p>
          </div>
          <select
            type="text"
            value={partnerFunding}
            className="field"
            name="partnerFunding"
            onChange={onchangeHandler}
            // selected='No'
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {partnerFunding === "Yes" ? (
          <div className="row column">
            <div className="title">
              <p>Funding Level (%)</p>
              <Tippy content="The percentage of the project cost IUK will provide. See IUK competition webpage for funding level details">
                <div className="info">
                  <img src={qMark} alt="info" />
                </div>
              </Tippy>
            </div>
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
          </div>
        ) : null}

        <div className="row column">
          <div className="title">
            <p>Match Funding Source</p>
          </div>
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
        </div>

        {matchFundingSource === "Company Funds" ? null : (
          <div className="row column">
            <div className="title">
              <p>Investor Name</p>
              <Tippy content="The source of the match funding provided to the project by the project partners">
                <div className="info">
                  <img src={qMark} alt="info" />
                </div>
              </Tippy>
            </div>
            <input
              type="text"
              value={investorName}
              className="field"
              name="investorName"
              onChange={onchangeHandler}
            />
          </div>
        )}
      </div>
    </Container>
  );
}
export default CompanyRows;
