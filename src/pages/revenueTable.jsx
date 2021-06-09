import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/user";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import { TableContainer } from "../components/table/tableStyling";
import MarkedComplete from "../components/modals/markedComplete";
import { updateSectionStatus } from "../store/entities/project";
import { revenueColor, revenueFontColor } from "../helpers"; // check this
import RevenueTitles from "../components/revenue/revenueTitles"; // check this
import RevenueInfo from "../components/revenue/revenueData"; // check this

function Revenue() {
  const dispatch = useDispatch();
  const selectedLeader = useSelector((state) => state.user.selectedLeader);
  const status = useSelector(
    (state) => state.entities.project.data.status.team[selectedLeader] // check this
  );
  const selectedOption = useSelector((state) => state.user.selectedTeamOption); // check this
  const menuList = ["Target Market", "Revenue", "R&D", "Details"]; // check this

  const menuData = {
    section: "Revenue", // check this
    status,
    menuList,
    selectedOption,
    color: revenueFontColor, // check this
    backgroundColor: revenueColor, // check this
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
            <RevenueTitles />
            <RevenueInfo />
          </div>
        </div>
      </div>
    </TableContainer>
  );
}
export default Revenue;
