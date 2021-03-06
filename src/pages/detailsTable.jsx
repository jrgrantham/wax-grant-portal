import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/user";
import LeftMenu from "../components/table/leftMenu";
import LeaderTabs from "../components/table/leaderTabs";
import { TableContainer } from "../components/table/tableStyling";
import MarkedComplete from "../components/modals/markedComplete";
import { updateSectionStatus } from "../store/entities/project";
import { projectColor, projectFontColor } from "../helpers"; // check this
import ProjectRows from "../components/details/projectRows"; // check this
import OptionsRows from "../components/details/optionsRows"; // check this
import CompanyRows from "../components/details/companyRows"; // check this

function Details() {
  const dispatch = useDispatch();
  const selectedLeader = useSelector((state) => state.user.selectedLeader);
  const status = useSelector(
    (state) => state.entities.project.data.status.details[selectedLeader] // check this
  );
  const selectedOption = useSelector(
    (state) => state.user.selectedDetailsOption // check this
  );
  const menuList = ["Project", "Options", "Company"]; // check this
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

  const maxHeight = {
    company: "550px",
    project: "350px",
    options: "550px", // min height applies
  };

  const data = {
    backgroundColor: menuData.backgroundColor,
    maxHeight: maxHeight[selectedOption],
  };

  const showLeaderTabs = {
    company: 3,
    project: 0,
    options: 0,
  };

  function content() {
    if (selectedOption === "company") return <CompanyRows />;
    if (selectedOption === "project") return <ProjectRows />;
    if (selectedOption === "options") return <OptionsRows />;
  }

  return (
    <TableContainer data={data}>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          {showLeaderTabs[selectedOption] ? (
            <LeaderTabs
              viewCombinedTab={showLeaderTabs[selectedOption] === 4}
            />
          ) : null}
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
