import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import {
  updateProjectInfo,
  setProjectDefaults,
} from "../../store/projectData/project";
import { getProjectDefaults } from "../../store/projectData/options";
import qMark from "../../images/qMark.png";
import { Container } from "./detailsStyling";
import { isNumberKey } from "../../helpers";

function ProjectRows() {
  const dispatch = useDispatch();

  function onchangeHandler(e) {
    const key = e.target.name;
    let value = e.target.value;
    value = value.slice(0, 50);
    dispatch(updateProjectInfo({ key, value }));
  }

  const { ipProtections, natures, months, years, projectLengths } = useSelector(
    (state) => state.options.data
  );

  const {
    productPlatformName,
    applicationNumber,
    nature,
    ipProtection,
    projectName,
    projectLength,
    startMonth,
    startYear,
    projectManager,
    software,
    funding,
  } = useSelector((state) => state.project.data.details);

  const defaults = getProjectDefaults(useSelector((state) => state));
  function applyDefaults() {
    dispatch(setProjectDefaults({ defaults }));
  }

  const data = {
    maxHeight: "350px",
  };

  return (
    <Container data={data}>
      <div className="rows">
        <div className="applyDefaults">
          <button onClick={applyDefaults}>
            <h3>Apply defaults</h3>
          </button>
        </div>

        <div className="row column">
          <div className="title">
            <p>Product / Platform Name</p>
          </div>
          <input
            type="text"
            value={productPlatformName}
            className="field"
            name="productPlatformName"
            onChange={onchangeHandler}
          />
        </div>

        <div className="row column">
          <div className="title">
            <p>Applicant Number</p>
          </div>
          <input
            type="text"
            value={applicationNumber}
            className="field"
            name="applicationNumber"
            onChange={onchangeHandler}
          />
        </div>

        <div className="row column">
          <div className="title">
            <p>Nature of Product or Service</p>
          </div>
          <select
            // type="text"
            value={nature}
            className="field"
            name="nature"
            onChange={onchangeHandler}
          >
            {natures.map((nature, index) => {
              return (
                <option key={index} value={nature}>
                  {nature}
                </option>
              );
            })}
          </select>
        </div>

        <div className="row column">
          <div className="title">
            <p>IP Protection Strategy</p>
          </div>
          <select
            value={ipProtection}
            className="field"
            name="ipProtection"
            onChange={onchangeHandler}
          >
            {ipProtections.map((protection, index) => {
              return (
                <option key={index} value={protection}>
                  {protection}
                </option>
              );
            })}
          </select>
          {/* </Tippy> */}
        </div>

        <div className="row column">
          <div className="title">
            <p>Project Name</p>
          </div>
          <input
            type="text"
            value={projectName}
            className="field"
            name="projectName"
            onChange={onchangeHandler}
          />
        </div>

        <div className="row column">
          <div className="title">
            <p>Timescale</p>
            <Tippy content="Check IUK competition website for guidance on project lengths">
              <div className="info">
                <img src={qMark} alt="info" />
              </div>
            </Tippy>
          </div>
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
            <Tippy content="Project length (months). Changing this will affect the Gantt Chart data">
              <select
                className="field length"
                name="projectLength"
                value={projectLength}
                onChange={onchangeHandler}
              >
                {projectLengths.map((year, index) => {
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

        <div className="row column">
          <div className="title">
            <p>Project Manager</p>
          </div>
          <input
            type="text"
            value={projectManager}
            className="field"
            name="projectManager"
            onChange={onchangeHandler}
          />
        </div>

        <div className="row column">
          <div className="title">
            <p>Management Software</p>
          </div>
          <input
            type="text"
            value={software}
            className="field"
            name="software"
            onChange={onchangeHandler}
          />
        </div>

        <div className="row column">
          <div className="title">
            <p>Commercialisation Funding Required</p>
          </div>
          <input
            type="boolean"
            value={funding}
            className="field"
            name="funding"
            onChange={onchangeHandler}
          />
        </div>
      </div>
    </Container>
  );
}
export default ProjectRows;
