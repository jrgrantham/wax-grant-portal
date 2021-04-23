import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/projectData/user";
import { teamColor, teamFontColor } from "../helpers";
import TeamData from "../components/team/teamData";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import TeamTitles from "../components/team/teamTitles";
import { TableContainer } from "../components/table/tableStyling";
import MarkedComplete from "../components/modals/markedComplete";
import { updateSectionStatus } from "../store/projectData/project";

function Team() {
  const dispatch = useDispatch();
  const selectedLeader = useSelector((state) => state.user.selectedLeader);
  const status = useSelector(
    (state) => state.project.data.status.details[selectedLeader]
  );
  const selectedOption = useSelector((state) => state.user.selectedTeamOption);
  const menuList = ["Staff", "Subcontract"];

  const menuData = {
    status,
    menuList,
    selectedOption,
    color: teamFontColor,
    backgroundColor: teamColor,
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedTeamOption", value }));
    },
    changeStatus: function () {
      dispatch(
        updateSectionStatus({ section: "details", leader: selectedLeader })
      );
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
          <LeaderTabs viewCombinedTab={false} />
          <div>
            {status ? <MarkedComplete /> : null}
            <TeamTitles />
            <TeamData />
          </div>
        </div>
      </div>
    </TableContainer>
  );
}
export default Team;
