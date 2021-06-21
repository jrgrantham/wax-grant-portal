import { store } from "../store";
import { createSelector } from "reselect";
import {
  getMarketData,
  getAnnualRevenue,
  getUKRevenue,
} from "../store/entities/revenue";
import { roundTo } from "./generalHelpers";
import { getTotalsByLeader } from "./costTotals";

export const getAllRevenueData = createSelector(
  (state) => state.entities.revenue,
  () => {
    console.log("getAllRevenueData");
    const state = store.getState();
    const markets = getMarketData(state);
    const revenue = getAnnualRevenue(state);
    const ukRevenue = getUKRevenue(state);
    const leadTotal = getTotalsByLeader(state).object.totals.lead;
    const ukInvest = getTotalsByLeader(state).object.grants.lead;
    const leadMatch = leadTotal - ukInvest;
    const { profitMargin, taxRate } = state.entities.revenue.data;

    console.log(revenue);

    const summary = {
      revenue,
      profit: {},
      ukShare: {},
      globalShare: {},
      corpTax: {},
      cumulativeCorpTax: {},
      roiInnovate: {},
      roiLead: {},
    };
    const years = ["y1", "y2", "y3", "y4", "y5"];
    let cumulativeCorpTax = 0;

    years.forEach((year) => {
      summary.profit[year] = roundTo(
        (summary.revenue[year] * profitMargin) / 100,
        0
      );
      summary.ukShare[year] = roundTo(
        (ukRevenue[year] / markets["UK Market"][year]) * 100,
        0
      );
      summary.globalShare[year] = roundTo(
        (summary.revenue[year] / markets.Global[year]) * 100,
        0
      );
      const tax = roundTo((summary.profit[year] * taxRate) / 100, 0);
      summary.corpTax[year] = tax;
      cumulativeCorpTax = cumulativeCorpTax + tax;
      summary.cumulativeCorpTax[year] = cumulativeCorpTax;

      const ukRoi = roundTo((cumulativeCorpTax - ukInvest) / ukInvest, 2);
      summary.roiInnovate[year] = ukRoi;

      const leadRoi = roundTo(
        (summary.profit[year] - leadMatch) / leadMatch,
        2
      );
      summary.roiLead[year] = leadRoi;
    });
    // console.log(summary.roiLead);
    return summary;
  }
);
