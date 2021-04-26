import React from "react";
import warning from "../../images/warning.png";
import { useSelector } from "react-redux";
import { getTotalDaysByPersonId, getUtilisations } from "../../helpers";
import { getDayRateById } from "../../helpers";

function LabourRow(props) {
  const { personId, name, role } = props.person;
  const daysById = getTotalDaysByPersonId();
  const dayRateById = getDayRateById(useSelector((state) => state));
  const days = daysById[personId];
  const cost = Math.round(days * dayRateById[personId]); // rounded
  const utilisation = getUtilisations()[personId];

  console.log(utilisation);

  return (
    <div className="row">
      <p className="field display labourNameRole">{`${name} (${role})`}</p>
      <p className="field display labourCost bold">{cost}</p>
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
