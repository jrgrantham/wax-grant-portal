import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../../store/user";
import OptionsInput from "./optionsInput";
import { Container } from "./optionsStyling";
import Global from "./globalIndicator";
import AdminModal from "../modals/adminModal";

// import MaterialsRow from "./optionsRow";

function TeamOptions() {
  const dispatch = useDispatch();
  const {
    maxTeamMembers,
    maxSubcontract,
    amberSalary,
    redSalary,
    amberDayRate,
    redDayRate,
  } = useSelector((state) => state.entities.setup.data);

  const {
    projectRoles,
    projectRoleDefault,
    locations,
    locationDefault,
  } = useSelector((state) => state.entities.global.data);
  const { showComponent } = useSelector((state) => state.user);

  function showModal(field) {
    const value = showComponent === field ? "" : field;
    dispatch(updateUserSelection({ key: "showComponent", value }));
  }

  const modalData = {
    projectRoles: {
      title: "Project Roles",
      global: true,
      list: projectRoles,
      defaultOption: projectRoleDefault,
      listKey: "projectRoles",
      // defaultKey: "projectRoleDefault",
    },
    locations: {
      title: "Subcontractor Locations",
      global: true,
      list: locations,
      defaultOption: locationDefault,
      listKey: "locations",
      defaultKey: "locationDefault",
    },
  };

  return (
    <Container>
      {showComponent === "projectRoles" || showComponent === "locations" ? (
        <AdminModal data={modalData[showComponent]} />
      ) : null}

      <div className="materials">
        <div className="rows">
          <div className="row titles leaderTabMargin">
            <p className="title description">Team Constraints</p>
            <p className="title value">Value</p>
          </div>

          <OptionsInput
            title="Max Staff per Partner"
            field={"maxTeamMembers"}
            value={maxTeamMembers}
          />

          <OptionsInput
            title="Max Subcontractors per Partner"
            field={"maxSubcontract"}
            value={maxSubcontract}
          />

          <div className="row titles leaderTabMargin">
            <p className="title description">Team Thresholds</p>
            <p className="title value">Amber</p>
            <p className="title value">Red</p>
          </div>

          <div className="row">
            <p className="field display description">Staff Salary</p>
            <OptionsInput
              multiple={true}
              field={"amberSalary"}
              value={amberSalary}
              characters={5}
            />
            <OptionsInput
              multiple={true}
              field={"redSalary"}
              value={redSalary}
              characters={5}
            />
          </div>

          <div className="row">
            <p className="field display description">Subcontract Day Rate</p>
            <OptionsInput
              multiple={true}
              field={"amberDayRate"}
              value={amberDayRate}
              characters={4}
            />
            <OptionsInput
              multiple={true}
              field={"redDayRate"}
              value={redDayRate}
              characters={4}
            />
          </div>

          <div className="row titles leaderTabMargin">
            <p className="title description">Team Options</p>
          </div>

          <div className="row">
            {global ? <Global /> : null}
            <p className="field display description">Project Roles</p>
            <button
              className="showModal value"
              onClick={() => showModal("projectRoles")}
            >
              Show
            </button>
          </div>

          <div className="row">
            {global ? <Global /> : null}
            <p className="field display description">Subcontractor Locations</p>
            <button
              className="showModal value"
              onClick={() => showModal("locations")}
            >
              Show
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default TeamOptions;
