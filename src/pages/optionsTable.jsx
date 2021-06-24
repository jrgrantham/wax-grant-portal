import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/user";
import LeftMenu from "../components/table/leftMenu";
import { TableContainer } from "../components/table/tableStyling";
import MarkedComplete from "../components/modals/markedComplete";
import { updateOptionsStatus } from "../store/entities/project";
import { settingsColor, settingsFontColor } from "../helpers"; // check this
import ProjectOptions from "../components/options/projectOptions"; // check this
import CostsOptions from "../components/options/costsOptions"; // check this
// import RevenueOptions from "../components/options/revenueOptions"; // check this
import TeamOptions from "../components/options/teamOptions";
import SetupOptions from "../components/options/setupOptions";

function Options() {
  const dispatch = useDispatch();
  const status = useSelector(
    (state) => state.entities.project.data.status.options // check this
  );
  const selectedOption = useSelector(
    (state) => state.user.selectedOptionsOption // check this
  );
  const menuList = ["Setup", "Project", "Team", "Finance"]; // check this
  const menuData = {
    section: "Options", // check this
    status,
    menuList,
    selectedOption,
    color: settingsFontColor, // check this
    backgroundColor: settingsColor, // check this
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedOptionsOption", value })); // check this
    },
    changeStatus: function () {
      dispatch(updateOptionsStatus());
    }, // check this
  };

  const maxHeight = {
    company: null,
    project: null,
    options: null, // min height applies
  };

  const data = {
    backgroundColor: menuData.backgroundColor,
    maxHeight: maxHeight[selectedOption],
  };

  const table = {
    setup: <SetupOptions />,
    project: <ProjectOptions />,
    team: <TeamOptions />,
    finance: <CostsOptions />,
  };

  return (
    <TableContainer data={data}>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          {status ? <MarkedComplete /> : null}
          {table[selectedOption]}
          {/* <div className="leaderTabMargin">{table[selectedOption]}</div> */}
        </div>
      </div>
    </TableContainer>
  );
}
export default Options;
