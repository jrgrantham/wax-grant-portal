import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/user";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import { TableContainer } from "../components/table/tableStyling";
import MarkedComplete from "../components/modals/markedComplete";
import { updateSectionStatus } from "../store/entities/project";
import { teamColor, teamFontColor } from "../helpers"; // check this
import TeamTitles from "../components/team/teamTitles"; // check this
import TeamInfo from "../components/team/teamData"; // check this

function Team() {
  const dispatch = useDispatch();
  const selectedLeader = useSelector((state) => state.user.selectedLeader);
  const status = useSelector(
    (state) => state.entities.project.data.status.team[selectedLeader] // check this
  );
  const selectedOption = useSelector((state) => state.user.selectedTeamOption); // check this
  const menuList = ["Staff", "Subcontract"]; // check this

  const menuData = {
    section: "Team", // check this
    status,
    menuList,
    selectedOption,
    color: teamFontColor, // check this
    backgroundColor: teamColor, // check this
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedTeamOption", value })); // check this
    },
    changeStatus: function () {
      dispatch(
        updateSectionStatus({ section: "team", leader: selectedLeader })
      );
    },
  };

  const data = {
    backgroundColor: menuData.backgroundColor,
    maxHeight: null,
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
            <TeamInfo />
          </div>
        </div>
      </div>
    </TableContainer>
  );
}
export default Team;
