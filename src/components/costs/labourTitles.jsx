import React from "react";
import { Container } from "./costsStyling";

function LabourTitles() {
  return (
    <Container>
      <div className="row titles leaderTabMargin">
        <p className="title labourNameRole">Name and Role</p>
        <p className="title labourCost">Cost</p>
        <p className="title labourDays">Days</p>
      </div>
    </Container>
  );
}
export default LabourTitles;
