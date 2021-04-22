import React from "react";
import { Container } from "./costsStyling";

function CostsTitles() {
  return (
    <Container>
      <div className="row titles">
        <div className="title nameRole">
          <p>Name and Role</p>
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
    </Container>
  );
}
export default CostsTitles;
