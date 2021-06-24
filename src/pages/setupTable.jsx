import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/user";
import LeftMenu from "../components/table/leftMenu";
import { TableContainer } from "../components/table/tableStyling";
import MarkedComplete from "../components/modals/markedComplete";
import { updateSetupStatus } from "../store/entities/project";
import { settingsColor, settingsFontColor } from "../helpers"; // check this
import Project from "../components/setup/projectOptions"; // check this
import Costs from "../components/setup/costsOptions"; // check this
import Team from "../components/setup/teamOptions";
import Setup from "../components/setup/setupOptions";

function SetupTable() {
  const dispatch = useDispatch();
  const status = useSelector(
    (state) => state.entities.project.data.status.setup // check this
  );
  const selectedOption = useSelector(
    (state) => state.user.selectedSetupOption // check this
  );
  const menuList = ["Partners", "Project", "Team", "Finance"]; // check this
  const menuData = {
    section: "Setup", // check this
    status,
    menuList,
    selectedOption,
    color: settingsFontColor, // check this
    backgroundColor: settingsColor, // check this
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedSetupOption", value })); // check this
    },
    changeStatus: function () {
      dispatch(updateSetupStatus());
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
    partners: <Setup />,
    project: <Project />,
    team: <Team />,
    finance: <Costs />,
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
export default SetupTable;
