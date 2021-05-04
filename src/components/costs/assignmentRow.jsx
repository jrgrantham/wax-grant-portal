import React from "react";

function combined(value) {
  return (
    <select value={value} className="field display assign group">
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  );
}

function separate(value) {
  return (
    <select value={value} className="field display assign grey">
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </select>
  );
}
function AssignmentRow(props) {
  console.log(index);
  const { index } = props;
  return (
    <div className="row ">
      <p className="field display assign">WP{index}</p>
      {combined()}
      {combined()}
      {combined()}

      {separate()}
      {separate()}
      {separate()}
      {separate()}
      {separate()}

      <p className="field display">1500</p>
    </div>
  );
}
export default AssignmentRow;
