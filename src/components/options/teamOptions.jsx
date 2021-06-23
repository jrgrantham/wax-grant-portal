import React from "react";
import { useDispatch, useSelector } from "react-redux";
import OptionsInput from "./optionsInput";
import ListOption from "./optionsList";
import { Container } from "./optionsStyling";
import Global from './globalIndicator';

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
    amberOverUtil,
    redOverUtil,
    projectRoles,
    projectRoleDefault,
    locations,
    locationDefault,
  } = useSelector((state) => state.entities.options.data);

  return (
    <Container>
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
              characters={3}
            />
            <OptionsInput
              multiple={true}
              field={"redDayRate"}
              value={redDayRate}
              characters={3}
            />
          </div>

          {/* <div className="row">
          <Global />
            <p className="field display description">Overutilisation</p>
            <OptionsInput
              multiple={true}
              field={"amberOverUtil"}
              value={amberOverUtil}
            />
            <OptionsInput
              multiple={true}
              field={"redOverUtil"}
              value={redOverUtil}
            />
          </div> */}

          <div className="row titles leaderTabMargin">
            <p className="title description">Team Options</p>
          </div>

          <ListOption
            title="Project Roles"
            global={true}
            list={projectRoles}
            defaultOption={projectRoleDefault}
            listKey="projectRoles"
            defaultKey="projectRoleDefault"
          />

          <ListOption
            title="Subcontractor Locations"
            global={true}
            list={locations}
            defaultOption={locationDefault}
            listKey="locations"
            defaultKey="locationDefault"
          />
        </div>
      </div>
    </Container>
  );
}
export default TeamOptions;
