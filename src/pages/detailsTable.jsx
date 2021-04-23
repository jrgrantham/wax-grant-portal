import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/projectData/user";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import { TableContainer } from "../components/table/tableStyling";
import MarkedComplete from "../components/modals/markedComplete";
import { updateSectionStatus } from "../store/projectData/project";
import { projectColor, projectFontColor } from "../helpers"; // check this
import ProjectRows from "../components/details/projectRows"; // check this
import OptionsRows from "../components/details/optionsRows"; // check this
import CompanyRows from "../components/details/companyRows"; // check this

function Details() {
  const dispatch = useDispatch();
  const selectedLeader = useSelector((state) => state.user.selectedLeader);
  const status = useSelector(
    (state) => state.project.data.status.details[selectedLeader] // check this
  );
  const selectedOption = useSelector(
    (state) => state.user.selectedDetailsOption // check this
  );
  const menuList = ["Company", "Project", "Options"]; // check this
  const menuData = {
    section: "Details", // check this
    status,
    menuList,
    selectedOption,
    color: projectFontColor, // check this
    backgroundColor: projectColor, // check this
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedDetailsOption", value })); // check this
    },
    changeStatus: function () {
      dispatch(
        updateSectionStatus({ section: "details", leader: selectedLeader }) // check this
      ); // check this
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
          <div>
            {status ? <MarkedComplete /> : null}
            <div className="leaderTabMargin">{content()}</div>
          </div>
        </div>
      </div>
    </TableContainer>
  );
}
export default Details;
