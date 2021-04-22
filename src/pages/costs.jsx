import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/projectData/user";
import { costsColor, costsFontColor } from "../helpers";
import TeamData from "../components/team/teamData";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import TeamTitles from "../components/team/teamTitles";
import { TableContainer } from "../components/table/tableStyling";

function Team() {
  const dispatch = useDispatch();
  const selectedOption = useSelector((state) => state.user.selectedCostsOption); // remember to change this when copying
  const menuList = [
    "Labour",
    "OverHead",
    "Materials",
    "Travel",
    "Subcontract",
    "CapEx",
    "Other",
    "Summary",
    "BreakDown",
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

  return (
    <TableContainer data={data}>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          <LeaderTabs viewCombinedTab={true} />
          {/* <TeamTitles /> */}
          {/* <TeamData /> */}
        </div>
      </div>
    </TableContainer>
  );
}
export default Team;
