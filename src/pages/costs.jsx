import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/projectData/user";
import { costsColor, costsFontColor } from "../helpers";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import CostInfo from "../components/costs/costsInfo";
import CostTitles from "../components/costs/costsTitles";
import { TableContainer } from "../components/table/tableStyling";

function Team() {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state) => state.user.selectedCostsOption); // remember to change this when copying
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
  ];

  const menuData = {
    menuList,
    selectedOption,
    color: costsFontColor,
    backgroundColor: costsColor,
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedCostsOption", value }));
    },
  };

  const data = {
    backgroundColor: menuData.backgroundColor,
    maxHeight: "550px",
  };

  const showLeaderTabs = {
    labour: 4,
    overhead: 4,
    materials: 4,
    travel: 3,
    subcontract: 4,
    capex: 4,
    other: 4,
    summary: false,
    breakdown: false,
  };

  return (
    <TableContainer data={data}>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          {showLeaderTabs[selectedOption] ? (
            <LeaderTabs viewCombinedTab={showLeaderTabs[selectedOption] === 4} />
          ) : null}
          {/* <TeamTitles /> */}
          {/* <TeamData /> */}
        </div>
      </div>
    </TableContainer>
  );
}
export default Team;
