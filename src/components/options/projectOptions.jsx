import React from "react";
import { useSelector } from "react-redux";
import { Container } from "./optionsStyling";
import ListOption from "./optionsList";
import OptionsInput from "./optionsInput";

function ProjectOptions() {

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

  return (
    <Container>
      <div className="rows">
        <div className="row titles leaderTabMargin">
          <p className="title description">Project Constraints</p>
          <p className="title value">Value</p>
        </div>

        <OptionsInput
          title="Max Project Length"
          field={"maxProjectLength"}
          value={maxProjectLength}
        />

        <OptionsInput
          title="Max Work Packages"
          field={"maxWorkPackages"}
          value={maxWorkPackages}
        />

        <OptionsInput
          title="Max Tasks per Work Package"
          field={"maxTasksPerPackage"}
          value={maxTasksPerPackage}
        />

        <OptionsInput
          title="Max Deadlines"
          field={"maxDeadlines"}
          value={maxDeadlines}
        />

        <div className="row titles leaderTabMargin">
          <p className="title description">Partner Options</p>
        </div>

        <ListOption
          global={true}
          title="Organisation Types"
          list={orgTypes}
          defaultOption={orgTypeDefault}
          listKey="orgTypes"
          defaultKey="orgTypeDefault"
        />

        <ListOption
          title="Organisation Sizes"
          global={true}
          list={orgSizes}
          defaultOption={orgSizeDefault}
          listKey="orgSizes"
          defaultKey="orgSizeDefault"
        />

        <div className="row titles leaderTabMargin">
          <p className="title description">Project Options</p>
        </div>

        <ListOption
          title="Product / Platform Natures"
          global={true}
          list={natures}
          defaultOption={natureDefault}
          listKey="natures"
          defaultKey="natureDefault"
        />

        <ListOption
          title="IP Protection Strategies"
          global={true}
          list={ipProtections}
          defaultOption={ipProtectionDefault}
          listKey="ipProtections"
          defaultKey="ipProtectionDefault"
        />
      </div>
    </Container>
  );
}
export default ProjectOptions;
