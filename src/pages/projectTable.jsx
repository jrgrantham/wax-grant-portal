import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/projectData/user";
import { projectColor, projectFontColor } from "../helpers";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import { TableContainer } from "../components/table/tableStyling";
import ProjectRows from "../components/details/projectRows";
import OptionsRows from "../components/details/optionsRows";
import CompanyRows from "../components/details/companyRows";

function Team() {
  const dispatch = useDispatch();
  const selectedOption = useSelector(
    (state) => state.user.selectedDetailsOption
  );
  const menuList = ["Company", "Project", "Options"];
  const menuData = {
    menuList,
    selectedOption,
    color: projectFontColor,
    backgroundColor: projectColor,
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedDetailsOption", value }));
    },
  };

  function content() {
    if (selectedOption === "company") return <CompanyRows />;
    if (selectedOption === "project") return <ProjectRows />;
    if (selectedOption === "options") return <OptionsRows />;
  }

  const maxHeight = {
    company: "550px",
    project: "350px",
    options: "550px", // min height applies
  };

  const data = {
    backgroundColor: menuData.backgroundColor,
    maxHeight: maxHeight[selectedOption],
  };
  return (
    <TableContainer data={data}>
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
