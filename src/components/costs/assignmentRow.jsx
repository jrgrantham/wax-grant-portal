import React from "react";
import Tippy from "@tippy.js/react";
import { useDispatch } from "react-redux";
import { getWorkPackageLabourCost } from "../../store/entities/allocations";
import { store } from "../../store";
import { getWPCost } from "../../helpers";
import { toggleAssignment } from "../../store/entities/assignments";
import { getWorkPackageTitles } from "../../store/entities/tasks";

function AssignmentRow(props) {
  const { index, pack, others, hasMaterials, hasTravel, hasCapex } = props;
  const state = store.getState();
  const dispatch = useDispatch();
  const { selectedLeader } = state.user;
  const assigned = state.entities.assignments.data[selectedLeader];

  const titles = getWorkPackageTitles(state);
  const labourCosts = getWorkPackageLabourCost(state)[pack];
  const additionalCosts = getWPCost(state)[pack].combined;
  const totalCost = labourCosts + additionalCosts;

  function toggleAssign(category) {
    dispatch(
      toggleAssignment({
        leader: selectedLeader,
        category,
        workPackageId: pack,
      })
    );
  }

  function assignButton(category, index) {
    const status = assigned[category].includes(pack);
    return (
      <button
        key={index}
        onClick={() => toggleAssign(category)}
        className={status ? "field display assign yes" : "field display assign no"}
      >
        {status ? "Yes" : "No"}
      </button>
    );
  }

  return (
    <div className="row">
      <Tippy content={titles[index]}>
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
