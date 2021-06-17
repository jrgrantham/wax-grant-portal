import React from "react";
import Tippy from "@tippy.js/react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkPackageLabourCost } from "../../store/entities/allocations";
import { getWPCost, numberToCurrency } from "../../helpers";
import { toggleAssignment } from "../../store/entities/assignments";
import { getWorkPackageTitles } from "../../store/entities/tasks";

function AssignmentRow(props) {
  console.log("AssignmentRow");
  const { index, pack, others, hasMaterials, hasTravel, hasCapex } = props;
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { selectedLeader } = state.user;
  const assigned = state.entities.assignments.data[selectedLeader];

  const titles = getWorkPackageTitles(state);
  const labourCosts = getWorkPackageLabourCost(state)[pack];
  const additionalCosts = getWPCost(state)[pack].combined;
  const totalCost = labourCosts + additionalCosts;
  const formattedCost = numberToCurrency(totalCost);

  function toggleAssign(providedCategory, other) {
    let category = providedCategory;
    if (other) category = other.otherId;
    dispatch(
      toggleAssignment({
        leader: selectedLeader,
        category,
        workPackageId: pack,
        other,
      })
    );
  }

  function assignButton(category, index, other) {
    let status = false;
    if (assigned[category]) status = assigned[category].includes(pack);
    return (
      <div key={index} className="hover">
        <button
          key={index}
          onClick={() => toggleAssign(category, other)}
          className={
            status ? "field display assign yes" : "field display assign no"
          }
        >
          {status ? "Yes" : "No"}
        </button>
      </div>
    );
  }

  return (
    <div className="row">
      <Tippy content={titles[index]}>
        <p className="field display assign pack">WP{index + 1}</p>
      </Tippy>
      {hasMaterials ? assignButton("materials") : null}
      {hasTravel ? assignButton("travel") : null}
      {hasCapex ? assignButton("capex") : null}
      {others.map((other, index) => {
        return assignButton(other.otherId, index, other);
      })}
      <p className="field display cost">{formattedCost}</p>
    </div>
  );
}
export default AssignmentRow;
