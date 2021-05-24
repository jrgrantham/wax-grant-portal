import React from "react";
import Tippy from "@tippy.js/react";
import { getWorkPackageLabourCost } from "../../store/entities/allocations";
import { store } from "../../store";

function assignButton(status, index) {
  // console.log(status === true);
  return (
    <p key={index} className="field display assign">
      {status ? "Yes" : "No"}
    </p>
    // <select key={index} className="field display assign">
    //   {/* <select key={index} value={value} className="field display assign"> */}
    //   <option value="Yes">Yes</option>
    //   <option value="No">No</option>
    // </select>
  );
}

function AssignmentRow(props) {
  const state = store.getState();
  const { index, pack, others, hasMaterials, hasTravel, hasCapex } = props;
  const workPackageCost = getWorkPackageLabourCost(state)[pack];
  const { selectedLeader } = state.user;
  const assigned = state.entities.assignments.data[selectedLeader];

  return (
    <div className="row ">
      <Tippy content={pack}>
        <p className="field display assign">WP{index + 1}</p>
      </Tippy>
      {hasMaterials ? assignButton(assigned.materials.includes(pack)) : null}
      {hasTravel ? assignButton(assigned.travel.includes(pack)) : null}
      {hasCapex ? assignButton(assigned.capex.includes(pack)) : null}
      {others.map((other, index) => {
        {
          return assignButton(other.cost, index);
        }
      })}
      <p className="field display">{workPackageCost}</p>
    </div>
  );
}
export default AssignmentRow;
