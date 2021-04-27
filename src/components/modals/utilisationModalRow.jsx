import React from "react";
import { roundTo } from "../../helpers";

function UtilisationModalRow(props) {
  const {maxDays, actualDays} = props.utilisation
  
  function className(days) {
    if (days > maxDays) return 'quarter over'
    if (days > maxDays - 5) return 'quarter under'
    return 'quarter ok'
  }

  console.log(props);
  return (
    <div className="modalRow">
      <p className="description">{props.name}</p>
      {actualDays.map((quarter, index) => {
        return (
          <p key={index} className={className(quarter)}>
            {quarter ? roundTo(quarter, 1) : null}
          </p>
        );
      })}
    </div>
  );
}

export default UtilisationModalRow;
