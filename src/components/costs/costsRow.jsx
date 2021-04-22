import React from "react";

function CostsRow(props) {
  const { person } = props;
  console.log(person.name, person.role);
  return (
    <div className="row">
      <div className="title nameRole">
        <p>{`${person.name}, ${person.role}`}</p>
      </div>
      <div className="title cost">
        <p>Cost</p>
      </div>
      <div className="title days">
        <p>Days</p>
      </div>
      <div className="title overutilised">
        <p>Overutilised</p>
      </div>
    </div>
  );
}
export default CostsRow;
