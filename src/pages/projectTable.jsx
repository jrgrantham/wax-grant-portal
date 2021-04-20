import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/projectData/user";
import { projectColor, projectFontColor } from "../helpers";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import { TableContainer } from "../components/table/tableStyling";
import ProjectRows from "../components/project/projectRows";
import OptionsRows from "../components/project/optionsRows";
import CompanyRows from "../components/project/companyRows";

function Team() {
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state) => state.user.selectedProjectOption
  );
  const menuList = ["Company", "Project", "Options"];
  const menuData = {
    menuList,
    selectedOption,
    color: projectFontColor,
    backgroundColor: projectColor,
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedProjectOption", value }));
    },
  };

  function content() {
    if (selectedOption === "company") return <CompanyRows />;
    if (selectedOption === "project") return <ProjectRows />;
    if (selectedOption === "options") return <OptionsRows />;
  }

  const data = {
    underline: menuData.backgroundColor,
    maxHeight: '550px'
  }

  return (
    <TableContainer underline={menuData.backgroundColor}>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          <LeaderTabs viewCombinedTab={false} />
          {content()}
        </div>
      </div>
    </TableContainer>
  );
}
export default Team;
