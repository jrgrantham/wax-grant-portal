import React from "react";
import { useSelector, useDispatch } from "react-redux";

import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import MarkedComplete from "../components/modals/markedComplete";
import { updateUserSelection } from "../store/projectData/user";
import { TableContainer } from "../components/table/tableStyling";
import { updateSectionStatus } from "../store/projectData/project";
import { costsColor, costsFontColor } from "../helpers"; // check this
import LabourTitles from "../components/costs/labourTitles"; // check this
import LabourInfo from "../components/costs/labourInfo"; // check this
import OverheadInfo from "../components/costs/overheadInfo"; // check this

function Team() {
  const dispatch = useDispatch();
  const selectedLeader = useSelector((state) => state.user.selectedLeader);
  const selectedOption = useSelector((state) => state.user.selectedCostsOption); // check this
  const status = useSelector(
    (state) => state.project.data.status.costs[selectedLeader] // check this
  );
  const menuList = [
    "Labour",
    "Overhead",
    "Materials",
    "Travel",
    "Subcontract",
    "CapEx",
    "Other",
    "Summary",
    "Breakdown",
  ]; // check this

  const menuData = {
    section: "Costs", // check this
    status,
    menuList,
    selectedOption,
    color: costsFontColor, // check this
    backgroundColor: costsColor, // check this
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedCostsOption", value })); // check this
    },
    changeStatus: function () {
      dispatch(
        updateSectionStatus({ section: "costs", leader: selectedLeader }) // check this
      ); // check this
    },
  };

  const data = {
    backgroundColor: menuData.backgroundColor,
    // maxHeight: "550px",
  };

  const showLeaderTabs = {
    labour: 3,
    overhead: 3,
    materials: 4,
    travel: 3,
    subcontract: 4,
    capex: 4,
    other: 4,
    summary: 0,
    breakdown: 0,
  }; // check this

  function content() {
    if (selectedOption === "labour")
      return (
        <>
          <LabourTitles />
          <LabourInfo />
        </>
      );
      if (selectedOption === "overhead") return <OverheadInfo />;
    //   if (selectedOption === "options") return <OptionsRows />;
  }

  return (
    <TableContainer data={data}>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          {showLeaderTabs[selectedOption] ? (
            <LeaderTabs
              viewCombinedTab={showLeaderTabs[selectedOption] === 4}
            />
          ) : null}
          <div>
            {status ? <MarkedComplete /> : null}
            {content()}
          </div>
        </div>
      </div>
    </TableContainer>
  );
}
export default Team;
