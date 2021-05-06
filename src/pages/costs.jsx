import React from "react";
import { useSelector, useDispatch } from "react-redux";

import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import MarkedComplete from "../components/modals/markedComplete";
import { updateUserSelection } from "../store/user";
import { TableContainer } from "../components/table/tableStyling";
import { updateSectionStatus } from "../store/entities/project";
import { costsColor, costsFontColor } from "../helpers"; // check this
import LabourStaff from "../components/costs/labourStaff"; // check this
import OverheadInfo from "../components/costs/overheadInfo"; // check this
import MaterialsInfo from "../components/costs/materialsInfo";
import TravelInfo from "../components/costs/travelInfo";
import LabourSubcontract from "../components/costs/labourSubcontract";
import CapexInfo from "../components/costs/capexInfo";
import OtherInfo from "../components/costs/otherInfo";
import OverviewModal from "../components/modals/overviewModal";
import BreakdownInfo from "../components/costs/breakdown";
import AssignmentInfo from "../components/costs/assignment";

function Costs() {
  // const dispatch = useDispatch();
  // const { selectedLeader, selectedOption, showComponent } = useSelector(
  //   (state) => state.user
  // );
  // const status = useSelector(
  //   (state) => state.entities.project.data.status.costs[selectedLeader] // check this
  // );

  const dispatch = useDispatch();
  const selectedLeader = useSelector((state) => state.user.selectedLeader);
  const selectedOption = useSelector((state) => state.user.selectedCostsOption); // check this
  const showComponent = useSelector((state) => state.user.showComponent); // check this
  const status = useSelector(
    (state) => state.entities.project.data.status.costs[selectedLeader] // check this
  );

  const menuList = [
    "Labour",
    "Overhead",
    "Materials",
    "Travel",
    "Subcontract",
    "CapEx",
    "Other",
    "Breakdown",
    "Assignment",
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
    travel: 4,
    subcontract: 3,
    capex: 4,
    other: 4,
    breakdown: 0,
    assignment: 3,
  }; // check this

  function showOverview() {
    dispatch(updateUserSelection({ key: "showComponent", value: "overview" }));
  }

  function content() {
    if (selectedOption === "labour") return <LabourStaff />;
    if (selectedOption === "subcontract") return <LabourSubcontract />;
    if (selectedOption === "overhead") return <OverheadInfo />;
    if (selectedOption === "materials") return <MaterialsInfo />;
    if (selectedOption === "travel") return <TravelInfo />;
    if (selectedOption === "capex") return <CapexInfo />;
    if (selectedOption === "other") return <OtherInfo />;
    // if (selectedOption === "breakdown") return <BreakdownInfo />;
    // if (selectedOption === "assignment") return <AssignmentInfo />;
  }

  return (
    <TableContainer data={data}>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          <div className="bottomRightCorner">
            <button onClick={showOverview}>
              <h3>Show Overview</h3>
            </button>
          </div>
          {showComponent === "overview" ? <OverviewModal /> : null}
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
export default Costs;
