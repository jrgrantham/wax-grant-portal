import React from "react";
import { Container } from "./costsStyling";
import { totals } from "../../helpers";

function BreakdownInfo() {
  const {
    capex,
    grants,
    labour,
    leaders,
    matchFunding,
    materials,
    other,
    percents,
    travel,
  } = totals();
  console.log(totals());

  return (
    <Container>
      <div className="materials">
        <div className="row titles leaderTabMargin">
          <p className="title materialsDescription">Description</p>
          <p className="title materialsCost">Cost (£)</p>
          <p className="title materialsQuantity">Quantity</p>
          <p className="title materialsTotal">Total</p>
        </div>
        <div className="rows">
          <div className="row"></div>
        </div>
      </div>
    </Container>
  );
}
export default BreakdownInfo;
