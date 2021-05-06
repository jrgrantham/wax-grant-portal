import React from "react";
import Tippy from "@tippy.js/react";

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
  // console.log(pack);
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
      <p className="field display">1500</p>
    </div>
  );
}
export default AssignmentRow;
