import React from "react";
import warning from "../../images/warning.png";
import { useSelector } from "react-redux";
import { getTotalDaysByPersonId } from "../../helpers";
import { getDayRateById } from "../../helpers";

function LabourRow(props) {
  const { person } = props;
  const daysById = getTotalDaysByPersonId();
  const dayRateById = getDayRateById(useSelector((state) => state));
  const days = daysById[person.personId];
  const cost = days * dayRateById[person.personId]
  console.log(dayRateById);
  return (
    <div className="row">
      <p className="field display labourNameRole">{`${person.name}, ${person.role}`}</p>
      <p className="field display labourCost">{cost}</p>
      <p className="field display labourDays">{days}</p>
      <div className="field display labourOverutilised">
        <div className="warning">
          <img src={warning} alt="warning" />
        </div>
        <p>Overutilised!</p>
      </div>
    </div>
  );
}
export default LabourRow;
