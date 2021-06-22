import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNumberKey } from "../../helpers";
import { Container } from "./optionsStyling";
import bin from "../../images/bin-grey.png";
import add from '../../images/add-grey.png'
import { updateUserSelection } from "../../store/user";

function ProjectOptions() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  const {
    maxProjectLength,
    maxWorkPackages,
    maxTasksPerPackage,
    maxDeadlines,
    orgTypes,
    orgTypeDefault,
    orgSize,
    orgSizeDefault,
  } = useSelector((state) => state.entities.options.data);
  const { showComponent } = useSelector((state) => state.user);

  function toggleList(list) {
    const value = showComponent === list ? "" : list;
    dispatch(updateUserSelection({ key: "showComponent", value }));
  }

  return (
    <Container>
      <div className="rows">
        <div className="row titles leaderTabMargin">
          <p className="title description">Project Constraints</p>
          <p className="title value">Value</p>
          <p className="title value"></p>
          <p className="title value"></p>
        </div>
        <div className="row">
          <p className="field display description">Max Project Length</p>
          <input
            type="text"
            id={"cost"}
            name="cost"
            value={maxProjectLength}
            onKeyDown={isNumberKey}
            // onChange={onChangeHandler}
            className="field value"
          />
        </div>
        <div className="row">
          <p className="field display description">Max Work Packages</p>
          <input
            type="text"
            id={"cost"}
            name="cost"
            value={maxWorkPackages}
            onKeyDown={isNumberKey}
            // onChange={onChangeHandler}
            className="field value"
          />
        </div>
        <div className="row">
          <p className="field display description">
            Max Tasks per Work Package
          </p>
          <input
            type="text"
            id={"cost"}
            name="cost"
            value={maxTasksPerPackage}
            onKeyDown={isNumberKey}
            // onChange={onChangeHandler}
            className="field value"
          />
        </div>
        <div className="row">
          <p className="field display description">Max Deadlines</p>
          <input
            type="text"
            id={"cost"}
            name="cost"
            value={maxDeadlines}
            onKeyDown={isNumberKey}
            // onChange={onChangeHandler}
            className="field value"
          />
        </div>
        <div className="row titles leaderTabMargin">
          <p className="title description">Partner Options</p>
          <p className="title value"></p>
          <p className="title value"></p>
          <p className="title value"></p>
        </div>

        <div className="row">
          <p className="field display description">Organisation Types</p>
          <input
            type="text"
            id={"cost"}
            name="cost"
            value={0}
            onKeyDown={isNumberKey}
            // onChange={onChangeHandler}
            className="field value"
          />
          <button className='imageButton add'><img src={add} alt="add"/></button>
          <button className="showButton" onClick={() => toggleList("orgType")}>
            {showComponent === "orgType" ? "Hide" : "Show"}
          </button>
        </div>
        {showComponent === "orgType" ? (
          <div className="list">
            {orgTypes.map((type, index) => {
              return (
                <div key={index} className="listRow">
                  <div className="left">
                    <button className="imageButton hidden">
                      <img src={bin} alt="delete" />
                    </button>
                    <p>{type}</p>
                  </div>
                  <button
                    className={type === orgTypeDefault ? "showButton selected" : "showButton hidden"}
                  >
                    Default
                  </button>
                </div>
              );
            })}
            <div className="listRow">
              <button className="showButton">Sort</button>
            </div>
          </div>
        ) : null}

        <div className="row">
          <p className="field display description">Organisation Sizes</p>
          <input
            type="text"
            id={"cost"}
            name="cost"
            value={0}
            onKeyDown={isNumberKey}
            // onChange={onChangeHandler}
            className="field value"
          />
        </div>
        <div className="row titles leaderTabMargin">
          <p className="title description">Project Options</p>
          <p className="title value"></p>
          <p className="title value"></p>
          <p className="title value"></p>
        </div>
        <div className="row">
          <p className="field display description">
            Product / Platform Natures
          </p>
          <input
            type="text"
            id={"cost"}
            name="cost"
            value={0}
            onKeyDown={isNumberKey}
            // onChange={onChangeHandler}
            className="field value"
          />
        </div>
        <div className="row">
          <p className="field display description">IP Protection Strategies</p>
          <input
            type="text"
            id={"cost"}
            name="cost"
            value={0}
            onKeyDown={isNumberKey}
            // onChange={onChangeHandler}
            className="field value"
          />
        </div>
      </div>
    </Container>
  );
}
export default ProjectOptions;
