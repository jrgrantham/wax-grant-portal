import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserSelection } from "../store/user";
import LeftMenu from "../components/table/leftMenu";
import { TableContainer } from "../components/table/tableStyling";
import MarkedComplete from "../components/modals/markedComplete";
import { updateRevenueStatus, updateSectionStatus } from "../store/entities/project";
import { revenueColor, revenueFontColor } from "../helpers"; // check this
import TargetMarket from "../components/revenue/targetMarketInfo"; // check this
import RevenueInfo from "../components/revenue/revenueInfo"; // check this

function Revenue() {
  const dispatch = useDispatch();
  const selectedLeader = useSelector((state) => state.user.selectedLeader);
  const status = useSelector(
    (state) => state.entities.project.data.status.revenue // check this
  );
  const selectedOption = useSelector(
    (state) => state.user.selectedRevenueOption
  ); // check this
  const menuList = ["Target Market", "Streams", "R&D", "Details"]; // check this

  console.log(status, selectedLeader);

  const menuData = {
    section: "Revenue", // check this
    status,
    menuList,
    selectedOption,
    color: revenueFontColor, // check this
    backgroundColor: revenueColor, // check this
    updateOption: function (value) {
      dispatch(updateUserSelection({ key: "selectedRevenueOption", value })); // check this
    },
    changeStatus: function () {
      dispatch(updateRevenueStatus()); // check this
    },
  };

  const data = {
    backgroundColor: menuData.backgroundColor,
    maxHeight: null,
  };

  function content() {
    if (selectedOption === "target market") return <TargetMarket />;
    if (selectedOption === "streams") return <RevenueInfo />;
  }

  return (
    <TableContainer data={data}>
      <div className="displayArea">
        <LeftMenu data={menuData} />
        <div className="content">
          <div>
            {status ? <MarkedComplete /> : null}
            {content()}
          </div>
        </div>
      </div>
    </TableContainer>
  );
}
export default Revenue;
