import { useSelector } from "react-redux";
import { store } from "../store";
import { createSelector } from "reselect";
import { getTotalDays } from "../store/entities/allocations";
import { getMaterialsCost } from "../store/entities/materials";
import { getTravelCost } from "../store/entities/travel";
import { getCapexCost } from "../store/entities/capex";
import { getOtherCost } from "../store/entities/other";
import { getGrants, getOverheads } from "../store/entities/project";

export const getTotalsByCategory = createSelector(
  (state) => state.entities,
  () => {
    console.log("getTotalsByCategory");
    const state = store.getState();
    const labour = getTotalDays(state);
    const materialsCost = getMaterialsCost(state);
    const travelCost = getTravelCost(state);
    const capexCost = getCapexCost(state);
    const otherCost = getOtherCost(state);

    const columns = ["lead", "pOne", "pTwo", "combined"];

    const leaders = [];
    const staff = [];
    const subcontract = [];
    const travel = [];
    const other = [];
    const capex = [];
    columns.forEach((leader) => {
      const total =
        Math.round(labour[leader].cost) +
        Math.round(materialsCost[leader]) +
        Math.round(travelCost[leader]) +
        Math.round(capexCost[leader]) +
        Math.round(otherCost[leader]);
      leaders.push(total);
      staff.push(Math.round(labour[leader].staff.cost));
      subcontract.push(Math.round(labour[leader].subcontract.cost));
      travel.push(Math.round(travelCost[leader]));
      other.push(Math.round(otherCost[leader]));
      capex.push(Math.round(capexCost[leader]));
    });

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
      materials: materialsCost,
      travel,
      subcontract,
      capex,
      other,
    };
    return summary;
  }
);

export const getTotalsByLeader = createSelector(
  (state) => state.entities,
  () => {
    console.log("getTotalsByLeader");
    const state = store.getState();
    const labour = getTotalDays(state);
    const overheads = getOverheads(state);
    const materialsCost = getMaterialsCost(state);
    const travelCost = getTravelCost(state);
    const capexCost = getCapexCost(state);
    const otherCost = getOtherCost(state);
    const grants = getGrants(state);

    const totals = {
      lead: 0,
      pOne: 0,
      pTwo: 0,
      combined: 0,
      category: "Total",
    };
    const columns = ["lead", "pOne", "pTwo", "combined"];
    columns.forEach((leader) => {
      const total =
        Math.round(labour[leader].cost) +
        Math.round(materialsCost[leader]) +
        Math.round(travelCost[leader]) +
        Math.round(capexCost[leader]) +
        Math.round(otherCost[leader]);
      totals[leader] = total;
    });

    grants.lead = Math.floor((grants.lead * totals.lead) / 100);
    grants.pOne = Math.floor((grants.pOne * totals.pOne) / 100);
    grants.pTwo = Math.floor((grants.pTwo * totals.pTwo) / 100);
    grants.combined = grants.lead + grants.pOne + grants.pTwo;

    function people(employment, category) {
      const total = {
        lead: Math.round(labour.lead[employment].cost),
        pOne: Math.round(labour.pOne[employment].cost),
        pTwo: Math.round(labour.pTwo[employment].cost),
        combined: Math.round(labour.combined[employment].cost),
        category,
      };
      return total;
    }

    const array = [
      people("staff", "Labour"),
      overheads,
      materialsCost,
      travelCost,
      people("subcontract", "Subcontract"),
      capexCost,
      otherCost,
      totals,
      grants,
    ];
    const object = {
      staff: people("staff", "Labour"),
      overheads,
      materialsCost,
      travelCost,
      subcontract: people("subcontract", "Subcontract"),
      capexCost,
      otherCost,
      totals,
      grants,
    }
    const summary = {
      array,
      object,
    }
    return summary;
  }
);