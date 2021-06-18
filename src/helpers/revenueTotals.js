import { store } from "../store";
import { createSelector } from "reselect";
import { getMarketData, getTotalRevenue } from "../store/entities/revenue";
import { roundTo } from "./generalHelpers";

export const getTotalRevenueTotals = createSelector(
  (state) => state.entities.revenue,
  () => {
    console.log("getTotalRevenueTotals");
    const state = store.getState();
    const markets = getMarketData(state);
    // console.log(markets);
    const revenue = getTotalRevenue(state);
    const { profit, taxRate } = state.entities.revenue.data;

    const summary = {
      revenue,
      profit: {},
      ukShare: {},
      globalShare: {},
      corpTax: {},
      roiInnovate: {},
      roiLead: {},
    };
    const years = ["y1", "y2", "y3", "y4", "y5"];
    // const titles = Object.keys(summary)

    years.forEach((year) => {
      summary.profit[year] = (summary.revenue[year] * profit) / 100;
      // summary.ukShare[year] = roundTo(
      //   summary.revenue[year] / markets["UK Market"][year] * 100,
      //   0
      // );
      summary.globalShare[year] = roundTo(
        (summary.revenue[year] / markets.Global[year]) * 100,
        0
      );
      summary.corpTax[year] = roundTo(
        (summary.profit[year] * taxRate) / 100,
        0
      );
    });

    // console.log(summary);
    return summary;
  }
);
