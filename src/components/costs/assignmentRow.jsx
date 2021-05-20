import React from "react";
import Tippy from "@tippy.js/react";
import { getWorkPackageLabourCost } from "../../store/entities/allocations";
import { store } from "../../store";

function selector(other, index) {
  return (
    <select key={index} className="field display assign">
      {/* <select key={index} value={value} className="field display assign"> */}
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  );
}

function AssignmentRow(props) {
  const { index, pack, others, hasMaterials, hasTravel, hasCapex } = props;
  const state = store.getState()
  const workPackageCost = getWorkPackageLabourCost(state)[pack]
  console.log(pack, workPackageCost);
  // console.log(others);
  return (
    <div className="row ">
      <Tippy content={pack}>
        <p className="field display assign">WP{index + 1}</p>
      </Tippy>
      {hasMaterials ? selector() : null} {/* materials */}
      {hasTravel ? selector() : null} {/* travel */}
      {hasCapex ? selector() : null} {/* capex */}
      {others.map((other, index) => {
        {
          return selector(other, index);
        }
      })}
      <p className="field display">{workPackageCost}</p>
    </div>
  );
}
export default AssignmentRow;
