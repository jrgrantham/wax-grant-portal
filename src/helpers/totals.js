import { store } from "../store";
import { createSelector } from "reselect";
import { getTotalDays } from "../store/entities/allocations";
import { getMaterialsCost } from "../store/entities/materials";
import { getTravelCost } from "../store/entities/travel";
import { getCapexCost } from "../store/entities/capex";
import { getOtherCost } from "../store/entities/other";
import { getFundingLevel, getOverheads } from "../store/entities/project";
import { getWorkPackageIds } from "../store/entities/tasks";

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
    const funding = getFundingLevel(state);

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

    const grants = {};
    grants.lead = Math.floor((funding.lead * totals.lead) / 100);
    grants.pOne = Math.floor((funding.pOne * totals.pOne) / 100);
    grants.pTwo = Math.floor((funding.pTwo * totals.pTwo) / 100);
    grants.combined = grants.lead + grants.pOne + grants.pTwo;
    grants.category = "Grant";

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
    };
    const { lead, pOne, pTwo } = otherCost.breakdown;
    const other = { lead, pOne, pTwo };
    const summary = {
      array,
      object,
      other,
    };
    return summary;
  }
);

export const getWPCost = createSelector(
  (state) => state.entities,
  () => {
    console.log("getWPCost");
    const state = store.getState();
    const wps = getWorkPackageIds(state);
    const assignments = state.entities.assignments.data;

    const leaders = ["lead", "pOne", "pTwo"];
    const categories = [
      "materials",
      "travel",
      "capex",
      "other1",
      "other2",
      "other3",
      "other4",
      "other5",
    ];

    function getCategoryCosts(leader) {
      const costs = {
        materials: getMaterialsCost(state)[leader],
        travel: getTravelCost(state)[leader],
        capex: getCapexCost(state)[leader],
      };
      const others = getOtherCost(state).breakdown[leader];
      const count = others.length;
      for (let i = 0; i < count; i++) {
        const key = "other" + (i + 1);
        costs[key] = others[i].cost;
      }
      return costs;
    }

    const result = {};
    wps.forEach((wp) => {
      result[wp] = {
        combined: 0,
        lead: 0,
        pOne: 0,
        pTwo: 0,
      };
    });

    leaders.forEach((leader) => {
      const costs = getCategoryCosts(leader);
      categories.forEach((category) => {
        const categoryCost = costs[category];
        const packs = assignments[leader][category];
        const packCount = packs.length;
        const share = Math.round(categoryCost / packCount);
        packs.forEach((pack) => {
          result[pack].combined = result[pack].combined + share;
          result[pack][leader] = result[pack][leader] + share;
        });
      });
    });
    return result;
  }
);

export const getWPStatus = createSelector(
  (state) => state.entities,
  (entities) => {
    console.log("getWPStatus");
    const state = store.getState();
    const totals = getTotalsByLeader(state);
    const assigned = entities.assignments.data;
    const leaders = ["lead", "pOne", "pTwo"];
    const result = {
      lead: {},
      pOne: {},
      pTwo: {},
    };

    leaders.forEach((leader) => {
      const hasMaterials = totals.object.materialsCost[leader] > 0;
      const hasTravel = totals.object.travelCost[leader] > 0;
      const hasCapex = totals.object.capexCost[leader] > 0;
      const hasOther1 =
        totals.object.otherCost.breakdown[leader][0] !== undefined;
      const hasOther2 =
        totals.object.otherCost.breakdown[leader][1] !== undefined;
      const hasOther3 =
        totals.object.otherCost.breakdown[leader][2] !== undefined;
      const hasOther4 =
        totals.object.otherCost.breakdown[leader][3] !== undefined;
      const hasOther5 =
        totals.object.otherCost.breakdown[leader][4] !== undefined;

      result[leader].hasMaterials = hasMaterials;
      result[leader].hasTravel = hasTravel;
      result[leader].hasCapex = hasCapex;
      result[leader].hasOther1 = hasOther1;
      result[leader].hasOther2 = hasOther2;
      result[leader].hasOther3 = hasOther3;
      result[leader].hasOther4 = hasOther4;
      result[leader].hasOther5 = hasOther5;

      result[leader].unassignedMaterials =
        hasMaterials && assigned[leader].materials.length === 0;

      result[leader].unassignedTravel =
        hasTravel && assigned[leader].travel.length === 0;

      result[leader].unassignedCapex =
        hasCapex && assigned[leader].capex.length === 0;

      result[leader].unassignedOther1 = assigned[leader].other1
        ? hasOther1 && assigned[leader].other1.length === 0
        : false;

      result[leader].unassignedOther2 = assigned[leader].other2
        ? hasOther2 && assigned[leader].other2.length === 0
        : false;

      result[leader].unassignedOther3 = assigned[leader].other3
        ? hasOther3 && assigned[leader].other3.length === 0
        : false;

      result[leader].unassignedOther4 = assigned[leader].other4
        ? hasOther4 && assigned[leader].other4.length === 0
        : false;

      result[leader].unassignedOther5 = assigned[leader].other5
        ? hasOther5 && assigned[leader].other5.length === 0
        : false;

      const anyUnassigned =
        result[leader].unassignedMaterials ||
        result[leader].unassignedTravel ||
        result[leader].unassignedCapex ||
        result[leader].unassignedOther1 ||
        result[leader].unassignedOther2 ||
        result[leader].unassignedOther3 ||
        result[leader].unassignedOther4 ||
        result[leader].unassignedOther5;
      result[leader].anyUnassigned = anyUnassigned
    });
    return result;
  }
);
