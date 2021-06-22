import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "./optionsStyling";
import MaterialsRow from "./optionsRow";

function TeamOptions() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const materials = state.entities.materials.data;
  const leader = state.user.selectedLeader;
  const combined = leader === "combined";
  const group = combined
    ? materials
    : materials.filter((item) => item.leader === leader);

  return (
    <Container>
      <div className="materials">
        <div className="rows">
          <div className="row titles leaderTabMargin">
            <p className="title description">Team Constraints</p>
            <p className="title value">Value</p>
            <p className="title value"></p>
            <p className="title value"></p>
          </div>
          <div className="row">
            <p className="field display description">
              Max Staff per Partner
            </p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">
              Max Subcontractors per Partner
            </p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row titles leaderTabMargin">
            <p className="title description">Team Thresholds</p>
            <p className="title value">Amber</p>
            <p className="title value">Red</p>
            <p className="title value"></p>
          </div>
          <div className="row">
            <p className="field display description">Staff Salary</p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">
              Subcontract Day Rate
            </p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">
              Overutilisation
            </p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row titles leaderTabMargin">
            <p className="title description">Description</p>
            <p className="title value">Option</p>
            <p className="title value"></p>
            <p className="title value"></p>
          </div>
          <div className="row">
            <p className="field display description">Project Roles</p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
          <div className="row">
            <p className="field display description">
              Subcontractor Locations
            </p>
            <input
              type="text"
              id={"cost"}
              name="cost"
              value={0}
              // onKeyDown={isNumberKey}
              // onChange={onChangeHandler}
              className="field value"
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
export default TeamOptions;
