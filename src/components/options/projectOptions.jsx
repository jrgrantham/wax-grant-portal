import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isNumberKey } from "../../helpers";
import { Container } from "./optionsStyling";
import bin from "../../images/bin-grey.png";
import add from "../../images/add-grey.png";
import { updateUserSelection } from "../../store/user";
import ListOption from "./listOption";

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
    orgSizes,
    orgSizeDefault,
    natures,
    natureDefault,
    ipProtections,
    ipProtectionDefault,
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

        <ListOption
          title="Organisation Types"
          list={orgTypes}
          defaultOption={orgTypeDefault}
          // updateDefault={updateDefault}
          // updateList={updateList}
          listKey="orgTypes"
          defaultKey="orgTypeDefault"
        />

        <ListOption
          title="Organisation Sizes"
          list={orgSizes}
          defaultOption={orgSizeDefault}
          // updateDefault={updateDefault}
          // updateList={updateList}
          listKey="orgSizes"
          defaultKey="orgSizeDefault"
        />

        <div className="row titles leaderTabMargin">
          <p className="title description">Project Options</p>
          <p className="title value"></p>
          <p className="title value"></p>
          <p className="title value"></p>
        </div>

        <ListOption
          title="Product / Platform Natures"
          list={natures}
          defaultOption={natureDefault}
          // updateDefault={updateDefault}
          // updateList={updateList}
          listKey="natures"
          defaultKey="natureDefault"
        />

        <ListOption
          title="IP Protection Strategies"
          list={ipProtections}
          defaultOption={ipProtectionDefault}
          // updateDefault={updateDefault}
          // updateList={updateList}
          listKey="ipProtections"
          defaultKey="ipProtectionDefault"
        />
      </div>
    </Container>
  );
}
export default ProjectOptions;
