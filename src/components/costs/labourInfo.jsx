import React from "react";
import { useSelector } from "react-redux";
import { getResources } from "../../helpers";

import LabourRow from "./labourRow";
import { Container } from "./costsStyling";

function LabourInfo() {
  const team = useSelector((state) => state.team.data);
  const leader = useSelector((state) => state.user.selectedLeader);
  const resources = getResources()
  console.log(resources);

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
