import React from "react";
import Tippy from "@tippy.js/react";
import { useDispatch } from "react-redux";
import { getWorkPackageLabourCost } from "../../store/entities/allocations";
import { store } from "../../store";
import { getWPCost, numberToCurrency } from "../../helpers";
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

  // function formattedCost() {
  //   let formattedCost = totalCost.toString();
  //   console.log(formattedCost.length);
  //   // totalCost.splice(',', 3)
  //   // const lastThree = formattedCost.slice(-3);
  //   // const lastThree = formattedCost.substr(formattedCost.length - 3)
  //   let result = "";
  //   for (let i = formattedCost.length - 1; i >= 0; i--) {
  //     const character = formattedCost.charAt(i);
  //     console.log(character);
  //     if (
  //       (i !== formattedCost.length - 1 && result.length % 3 === 0) ||
  //       (i < formattedCost.length - 1 && result.length % (3 + 1) === 0)
  //     ) {
  //       result = "," + result;
  //     }
  //     result = character + result;
  //   }
  //   console.log(result);
  //   return result;
  // }

  const formattedCost = numberToCurrency(totalCost)

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
        className={
          status ? "field display assign yes" : "field display assign no"
        }
      >
        {status ? "Yes" : "No"}
      </button>
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
      {others.map((_, index) => {
        {
          const category = "other" + (index + 1);
          return assignButton(category, index);
        }
      })}
      <p className="field display cost">{formattedCost}</p>
    </div>
  );
}
export default AssignmentRow;
