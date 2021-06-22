import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/user";
import LeftMenu from "../components/table/leftMenu";
import { TableContainer } from "../components/table/tableStyling";
import MarkedComplete from "../components/modals/markedComplete";
import { updateOptionsStatus } from "../store/entities/project";
import { settingsColor, settingsFontColor } from "../helpers"; // check this
import ProjectRows from "../components/details/projectRows"; // check this
import ProjectOptions from "../components/options/projectOptions"; // check this
import FinanceOptions from "../components/options/financeOptions"; // check this
import TeamOptions from "../components/options/teamOptions";

function Options() {
  const dispatch = useDispatch();
  const status = useSelector(
    (state) => state.entities.project.data.status.options // check this
  );
  const selectedOption = useSelector(
    (state) => state.user.selectedOptionsOption // check this
  );
  const menuList = ["Details", "Team", "Finance", "General"]; // check this
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
    details: <ProjectOptions />,
    team: <TeamOptions />,
    finance: <FinanceOptions />,
    general: <ProjectRows />,
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
