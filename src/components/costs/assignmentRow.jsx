import React from "react";
import Tippy from "@tippy.js/react";

function selector(value) {
  return (
    <select value={value} className="field display assign">
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  );
}
function AssignmentRow(props) {
  const { index, pack, others } = props;
  // console.log(pack);
  console.log(others);
  return (
    <div className="row ">
      <Tippy content={pack}>
        <p className="field display assign">WP{index + 1}</p>
      </Tippy>
      {selector()} {/* materials */}
      {selector()} {/* travel */}
      {selector()} {/* capex */}
      {others.map((other, index) => {
        {
          return selector();
        }
      })}
      <p className="field display">1500</p>
    </div>
  );
}
export default AssignmentRow;
