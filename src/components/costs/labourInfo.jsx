import React from "react";
import { useSelector } from "react-redux";

import LabourRow from "./labourRow";
import { Container } from "./costsStyling";

function LabourInfo() {
  const leader = useSelector((state) => state.user.selectedLeader);
  const team = useSelector((state) => state.team.data).filter(person => person.leader === leader);

  return (
    <Container>
      <div className="rows">
      {team.map((person, index) => {
        return <LabourRow key={index} person={person} />;
      })}
      </div>
    </Container>
  );
}
export default LabourInfo;
