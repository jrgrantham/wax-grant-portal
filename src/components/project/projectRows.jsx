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

  const {
    productPlatformName,
    applicationNumber,
    nature,
    protection,
    projectName,
    projectLength,
    ProjectStart,
    projectManager,
    software,
    funding,
  } = useSelector((state) => state.project.data.details);

  return (
    <Container>
      <div className="rows">
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
          <Tippy placement="top-start" content="IUK's grant platform applicant number">
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
            <input
              type="text"
              value={nature}
              className="field"
              name="nature"
              onChange={onchangeHandler}
            />
          </Tippy>
        </div>
        <div className="row">
          {/* <Tippy content="The strategy used to protect the IP generated during the project">
            <div className="info">
              <img src={qMark} alt="info" />
            </div>
          </Tippy> */}
          <Tippy placement="top-start" content="IP Protection Strategy">
            <input
              type="text"
              value={protection}
              className="field"
              name="protection"
              onChange={onchangeHandler}
            />
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
        <div className="row">
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
        </div>
        <div className="row">
          <Tippy placement="top-start" content="Project Start">
            <input
              type="date"
              value={ProjectStart}
              className="field"
              name="ProjectStart"
              onChange={onchangeHandler}
            />
          </Tippy>
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
