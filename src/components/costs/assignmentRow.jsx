import React from "react";
import Tippy from "@tippy.js/react";
import { useDispatch } from "react-redux";
import { getWorkPackageLabourCost } from "../../store/entities/allocations";
import { store } from "../../store";
import { getWPCost } from "../../helpers";
import { addAssignment } from "../../store/entities/assignments";

function AssignmentRow(props) {
  const { index, pack, others, hasMaterials, hasTravel, hasCapex } = props;
  const state = store.getState();
  const dispatch = useDispatch();
  const { selectedLeader } = state.user;
  const assigned = state.entities.assignments.data[selectedLeader];

  const labourCosts = getWorkPackageLabourCost(state)[pack];
  const additionalCosts = getWPCost(state)[pack].combined;
  const totalCost = labourCosts + additionalCosts;

  function toggleAssign(category) {
    console.log("toggle");
    dispatch(
      addAssignment({
        leader: selectedLeader,
        category,
        workPackageId: 0,
      })
    );
  }

  function assignButton(category, index) {
    const status = assigned[category].includes(pack);
    return (
      <p key={index} onClick={toggleAssign} className="field display assign">
        {status ? "Yes" : "No"}
      </p>
    );
  }

  return (
    <div className="row">
      <Tippy content={pack}>
        <p className="field display assign">WP{index + 1}</p>
      </Tippy>
      {hasMaterials ? assignButton("materials") : null}
      {hasTravel ? assignButton("travel") : null}
      {hasCapex ? assignButton("capex") : null}
      {others.map((_, index) => {
        {
          const category = "other" + (index + 1);
          return assignButton(category, index);
        }
      })}
      <p className="field display">{totalCost}</p>
    </div>
  );
}
export default AssignmentRow;
