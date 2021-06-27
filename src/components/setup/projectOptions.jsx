import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "./optionsStyling";
import ListOption from "./optionsList";
import OptionsInput from "./optionsInput";
import Global from "./globalIndicator";
import { updateUserSelection } from "../../store/user";
import AdminModal from "../modals/adminModal";

function ProjectOptions() {
  const dispatch = useDispatch();
  const {
    maxProjectLength,
    maxWorkPackages,
    maxTasksPerPackage,
    maxDeadlines,
  } = useSelector((state) => state.entities.setup.data);
  const { showComponent } = useSelector((state) => state.user);

  const {
    orgTypes,
    orgTypeDefault,
    orgSizes,
    orgSizeDefault,
    natures,
    natureDefault,
    ipProtections,
    ipProtectionDefault,
  } = useSelector((state) => state.entities.global.data);

  function showModal(field) {
    const value = showComponent === field ? "" : field;
    dispatch(updateUserSelection({ key: "showComponent", value }));
  }

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

        <div className="row">
          {global ? <Global /> : null}
          {showComponent === "orgTypes" ? (
            <AdminModal
              title="Organisation Types"
              list={orgTypes}
              defaultOption={orgTypeDefault}
              listKey="orgTypes"
              defaultKey="orgTypeDefault"
            />
          ) : null}
          <p className="field display description">Organisation Types</p>
          <button className="showButton" onClick={() => showModal("orgTypes")}>
            Show
          </button>
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
