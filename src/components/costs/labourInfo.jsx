import React from "react";
import { useSelector } from "react-redux";
import LabourRow from "./labourRow";
import { Container } from "./costsStyling";
import { getTotalDaysByPersonId } from "../../store/entities/allocations";

function LabourInfo() {
  const state = useSelector((state) => state);
  const leader = state.user.selectedLeader;
  const team = state.entities.team.data.filter((person) => person.leader === leader);
  const { days, cost } = getTotalDaysByPersonId(state)[leader];

  return (
    <Container>
      <div className="rows">
        {team.map((person, index) => {
          return <LabourRow key={index} person={person} />;
        })}
        {team.length > 0 ? (
          <div className="row">
            <p className="field display labourNameRole" />
            <div className="total">
              <p className="field display labourCost">{Math.round(cost)}</p>
              <p className="field display labourDays">{Math.round(days)}</p>
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
}
export default LabourInfo;
