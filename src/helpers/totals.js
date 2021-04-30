import { useSelector } from "react-redux";
import { getTotalDays } from "../store/entities/allocations";
import { getMaterialsCost } from "../store/entities/materials";
import { getTravelCost } from "../store/entities/travel";
import { getCapexCost } from "../store/entities/capex";
import { getOtherCost } from "../store/entities/other";

export function totals() {
  const state = useSelector((state) => state);
  const labour = getTotalDays(state);
  const materials = getMaterialsCost(state);
  const travel = getTravelCost(state);
  const capex = getCapexCost(state);
  const other = getOtherCost(state);

  const columns = ["lead", "pOne", "pTwo", "combined"];

  const leaders = [];
  const staff = [];
  const subcontract = [];
  columns.forEach((leader) => {
    const total =
      Math.round(labour[leader].cost) +
      Math.round(materials[leader]) +
      Math.round(travel[leader]) +
      Math.round(capex[leader]) +
      Math.round(other[leader]);
    staff.push(Math.round(labour[leader].staff.cost));
    subcontract.push(Math.round(labour[leader].subcontract.cost));
    leaders.push(total);
  });

  // console.log(labour);

  const percents = [
    Math.round((leaders[0] / leaders[3]) * 100),
    Math.round((leaders[1] / leaders[3]) * 100),
    Math.round((leaders[2] / leaders[3]) * 100),
    100,
  ];

  const { lead, pOne, pTwo } = state.entities.project.data;
  const leadGrant = Math.floor((leaders[0] * lead.fundingLevel) / 100);
  const pOneGrant = Math.floor((leaders[1] * pOne.fundingLevel) / 100);
  const pTwoGrant = Math.floor((leaders[2] * pTwo.fundingLevel) / 100);
  const totalGrant = leadGrant + pOneGrant + pTwoGrant;
  const grants = [leadGrant, pOneGrant, pTwoGrant, totalGrant];

  const matchFunding = [
    leaders[0] - grants[0],
    leaders[1] - grants[1],
    leaders[2] - grants[2],
    leaders[3] - totalGrant,
  ];

  const summary = {
    leaders,
    percents,
    grants,
    matchFunding,

    labour,
    staff,
    //overhead
    materials,
    travel,
    subcontract,
    capex,
    other,
  };
  return summary;
}
