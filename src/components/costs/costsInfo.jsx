import React from "react";
import { useSelector } from "react-redux";
import { getResources } from "../../helpers";

import CostsRow from "./costsRow";
import { Container } from "./costsStyling";

function TeamInfo() {
  const team = useSelector((state) => state.team.data);
  const leader = useSelector((state) => state.user.selectedLeader);
  const resources = getResources()
  console.log(resources);

  return (
    <Container>
      {team.map((person, index) => {
        return <CostsRow key={index} person={person} />;
      })}
    </Container>
  );
}
export default TeamInfo;
