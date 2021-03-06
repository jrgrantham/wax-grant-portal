import React from "react";
import { useSelector } from "react-redux";
import LabourRow from "./labourRow";
import { Container } from "./costsStyling";
import { getTotalDays } from "../../store/entities/allocations";
import { numberToCurrency } from "../../helpers";

function LabourStaff() {
  const state = useSelector((state) => state);
  const leader = state.user.selectedLeader;
  const team = state.entities.team.data.filter(
    (person) => person.leader === leader && person.employment === "staff"
  );
  const {cost, days} = getTotalDays(state)[leader].staff;
  const formattedCost = numberToCurrency(cost)

  return (
    <Container>
      <div className="labour">
        <div className="row titles leaderTabMargin">
          <p className="title labourNameRole">Name and Role</p>
          <p className="title labourCost">Cost</p>
          <p className="title labourDays">Days</p>
        </div>
        <div className="rows">
          {team.map((person, index) => {
            return <LabourRow key={index} person={person} index={index} />;
          })}
          {team.length > 0 ? (
            <div className="row">
              <p className="field display labourNameRole" />
              <div className="total">
                <p className="field display labourCost">{formattedCost}</p>
                <p className="field display labourDays">{Math.round(days)}</p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Container>
  );
}
export default LabourStaff;
