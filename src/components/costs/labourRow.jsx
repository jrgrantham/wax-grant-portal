import React from "react";
import warning from "../../images/warning.png";
import { useSelector } from "react-redux";
import { getUtilisations, getDayRateById } from "../../store/entities/team";
import { getTotalDaysByPersonId } from "../../store/entities/allocations";

function LabourRow(props) {
  const { personId, name, role } = props.person;
  const state = useSelector((state) => state);
  const daysById = getTotalDaysByPersonId(state);
  const dayRateById = getDayRateById(state);
  const utilisation = getUtilisations(state)[personId];
  
  const days = daysById[personId];
  const cost = Math.round(days * dayRateById[personId]); // rounded

  return (
    <div className="row">
      <p className="field display labourNameRole">{`${name} (${role})`}</p>
      <p className="field display labourCost">{cost}</p>
      <p className="field display labourDays">{days}</p>
      {utilisation.overutilised ? (
        <>
          <div className="warning">
            <img src={warning} alt="warning" />
          </div>
          <p className="field display labourOverutilised">Overutilised!</p>
        </>
      ) : null}
    </div>
  );
}
export default LabourRow;
