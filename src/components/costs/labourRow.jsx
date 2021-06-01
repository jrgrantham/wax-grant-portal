import React from "react";
import warning from "../../images/warning.png";
import { useSelector, useDispatch } from "react-redux";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { getUtilisations, getDayRateById } from "../../store/entities/team";
import { getTotalDays } from "../../store/entities/allocations";
import { updateUserSelection } from "../../store/user";
import UtilisationModal from "../modals/utilisationModal";
import { numberToCurrency } from "../../helpers";

function LabourRow(props) {
  const dispatch = useDispatch();
  const { personId, name, role } = props.person;
  const index = props.index;
  const state = useSelector((state) => state);
  const daysById = getTotalDays(state);
  const dayRateById = getDayRateById(state);
  const utilisation = getUtilisations(state)[personId].overutilised;
  const { showComponent, selectedLeader } = state.user;

  const days = daysById[personId];
  const cost = Math.round(days * dayRateById[personId]); // rounded
  const formattedCost = numberToCurrency(cost);
  const modalId = "utilisationModel" + selectedLeader + index;

  function showDetails() {
    dispatch(
      updateUserSelection({
        key: "showComponent",
        value: modalId,
      })
    );
  }

  return (
    <div className="row">
      {showComponent === modalId ? <UtilisationModal /> : null}
      <p className="field display labourNameRole">{`${name} (${role})`}</p>
      <p className="field display labourCost">{formattedCost}</p>
      <p className="field display labourDays">{days}</p>
      {utilisation ? (
        <Tippy content="Click here for details">
          <button onClick={showDetails} className="warningButton">
            <div className="warningIcon">
              <img src={warning} alt="warning" />
            </div>
            <span className="field display labourOverutilised">
              Overutilised
            </span>
          </button>
        </Tippy>
      ) : null}
    </div>
  );
}

export default LabourRow;
