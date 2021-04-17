import React from "react";
import { useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useSelector } from "react-redux";
import { Container } from "./projectStyling";
import { updateProjectInfo } from "../../store/projectData/project";
import qMark from "../../images/qMark.png";

function ProjectRows() {
  const dispatch = useDispatch();

  function onchangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    value = value.slice(0, 50);
    dispatch(updateProjectInfo({ key, value }));
  }

  function applyDefault() {}

  const {
    fundingLevels,
    ipProtections,
    markets,
    locations,
    orgSize,
    orgType,
    matchFundingSources,
    natures,
    overheadRates,
  } = useSelector((state) => state.options.data);

  const {
    productPlatformName,
    applicationNumber,
    nature,
    protection,
    projectName,
    projectLength,
    startMonth,
    startYear,
    projectManager,
    software,
    funding,
  } = useSelector((state) => state.project.data.details);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029];
  const length = [];
  for (let i = 1; i < 37; i++) {
    length.push(i);
  }

  return (
    <Container>
      <div className="rows">
        <div className="bottomRow">
          <button onClick={applyDefault}>
            <h3>Apply defaults</h3>
          </button>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Product / Platform Name">
            <input
              type="text"
              value={productPlatformName}
              className="field"
              name="productPlatformName"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          {/* <Tippy content="IUK's grant platform applicant number">
            <div className="info">
              <img src={qMark} alt="info" />
            </div>
          </Tippy> */}
          <Tippy
            placement="top-start"
            content="IUK's grant platform applicant number"
          >
            <input
              type="text"
              value={applicationNumber}
              className="field"
              name="applicationNumber"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          {/* <Tippy content="The nature of the output from the project">
            <div className="info">
              <img src={qMark} alt="info" />
            </div>
          </Tippy> */}
          <Tippy placement="top-start" content="Nature of Product or Service">
            <select
              // type="text"
              value={nature}
              className="field"
              name="nature"
              onChange={onchangeHandler}
            >
              {natures.map((nature,index) => {
                return <option key={index} value={nature}>{nature}</option>
              })}
            </select>
          </Tippy>
        </div>
        <div className="row">
          {/* <Tippy content="The strategy used to protect the IP generated during the project">
            <div className="info">
              <img src={qMark} alt="info" />
            </div>
          </Tippy> */}
          <Tippy placement="top-start" content="IP Protection Strategy">
            <select
              // type="text"
              value={protection}
              className="field"
              name="protection"
              onChange={onchangeHandler}
            >
              {ipProtections.map((protection, index) => {
                return <option key={index} value={protection}>{protection}</option>
              })}
            </select>
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Project Name">
            <input
              type="text"
              value={projectName}
              className="field"
              name="projectName"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        {/* <div className="row">
          <Tippy content="Select the project length (months). Check IUK competition website for guidance on project lengths">
            <div className="info">
              <img src={qMark} alt="info" />
            </div>
          </Tippy>
          <Tippy placement="top-start" content="Project Length (months)">
            <input
              type="number"
              value={projectLength}
              className="field"
              name="projectLength"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div> */}
        <div className="row">
          <Tippy content="Check IUK competition website for guidance on project lengths">
            <div className="info">
              <img src={qMark} alt="info" />
            </div>
          </Tippy>
          <div className="projectStart">
            <Tippy placement="top-start" content="Month project starts">
              <select
                className="field month"
                name="startMonth"
                value={startMonth}
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
            </Tippy>
            <Tippy content="Year project starts">
              <select
                className="field year"
                name="startYear"
                value={startYear}
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
            </Tippy>
            <Tippy content="Project length (months)">
              <select
                className="field length"
                name="projectLength"
                value={projectLength}
                onChange={onchangeHandler}
              >
                {length.map((year, index) => {
                  return (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  );
                })}
              </select>
            </Tippy>
          </div>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Project Manager">
            <input
              type="text"
              value={projectManager}
              className="field"
              name="projectManager"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Management Software">
            <input
              type="text"
              value={software}
              className="field"
              name="software"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          <Tippy
            placement="top-start"
            content="Commercialisation Funding Required"
          >
            <input
              type="boolean"
              value={funding}
              className="field"
              name="funding"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
      </div>
    </Container>
  );
}
export default ProjectRows;
