// import axios from "axios";
import { store } from "../index";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { roundTo } from "../../helpers";

const slice = createSlice({
  name: "revenue",
  initialState: {
    loading: false,
    error: "",
    data: {
      revenueStart: 2022,
      profitMargin: 55,
      taxRate: 25,
      markets: [
        { name: "UK Market", growth: 10, start: 500 },
        { name: "US Market", growth: 10, start: 500 },
        { name: "Global", growth: 20, start: 500 },
      ],
      streams: [
        {
          streamName: "Rubber Toys",
          "UK Market": { y1: 10, y2: 20, unitRevenue: 3 },
          "US Market": { unitRevenue: 5 },
          "Asia Market": {},
        },
        {
          name: "Test",
          "UK Market": { y1: 20, y2: 40 },
        },
      ],
      total: [],
    },
  },
  reducers: {
    updateMarket: (revenue, action) => {
      const { index, key, value } = action.payload;
      revenue.data.markets[index][key] = value;
    },
    addMarket: (revenue) => {
      const index = revenue.data.markets.length - 1;
      revenue.data.markets.splice(index, 0, {});
    },
    deleteMarket: (revenue, action) => {
      const { index } = action.payload;
      revenue.data.markets.splice(index, 1);
    },
    updateRevenueKey: (revenue, action) => {
      const {key, value} = action.payload
      revenue.data[key] = value;
    },
    updateProfitMargin: (revenue, action) => {
      revenue.data.profitMargin = action.payload.profitMargin;
    },
    updateCorpTax: (revenue, action) => {
      revenue.data.corpTax = action.payload.corpTax;
    },
    updateStreamYear: (revenue, action) => {
      const { streamIndex, key, year, value } = action.payload;
      if (!revenue.data.streams[streamIndex][key])
        revenue.data.streams[streamIndex][key] = {};
      revenue.data.streams[streamIndex][key][year] = value;
    },
    updateStreamName: (revenue, action) => {
      const { streamIndex, key, value } = action.payload;
      revenue.data.streams[streamIndex][key] = value;
    },
    updateStreamUnit: (revenue, action) => {
      const { streamIndex, value, markets } = action.payload;
      console.log(streamIndex, value, markets);
      markets.forEach((market) => {
        if (!revenue.data.streams[streamIndex][market])
          revenue.data.streams[streamIndex][market] = {};
        revenue.data.streams[streamIndex][market].unitRevenue = value;
      });
    },
    addStream: (revenue) => {
      revenue.data.streams.push({});
    },
    deleteStream: (revenue, action) => {
      const { index } = action.payload;
      revenue.data.streams.splice(index, 1);
    },
  },
});

export const {
  updateMarket,
  addMarket,
  deleteMarket,
  updateRevenueKey,
  updateStreamYear,
  updateStreamName,
  updateStreamUnit,
  addStream,
  deleteStream,
} = slice.actions;
export default slice.reducer;

export const getMarketList = createSelector(
  (state) => state.entities.revenue.data.markets,
  (markets) => {
    console.log("getMarketList");
    const result = [];
    markets.forEach((market) => {
      if (market.name === "Global") return;
      result.push(market.name);
    });
    return result;
  }
);

export const getMarketData = createSelector(
  (state) => state.entities.revenue.data.markets,
  (markets) => {
    console.log("getMarketData");
    const result = {};
    markets.forEach((market) => {
      let { name, start, growth } = market;
      const values = name && start;
      growth = growth ? growth : 0;
      const y1 = start;
      const y2 = values ? roundTo(y1 + (y1 * growth) / 100, 0) : null;
      const y3 = values ? roundTo(y2 + (y2 * growth) / 100, 0) : null;
      const y4 = values ? roundTo(y3 + (y3 * growth) / 100, 0) : null;
      const y5 = values ? roundTo(y4 + (y4 * growth) / 100, 0) : null;
      result[name] = { y1, y2, y3, y4, y5 };
    });
    return result;
  }
);

export const getStreamTotals = createSelector(
  (state) => state.entities.revenue.data.streams,
  (streams) => {
    console.log("getStreamTotals");
    const markets = getMarketList(store.getState());
    const years = ["y1", "y2", "y3", "y4", "y5"];
    const result = [];

    for (let i = 0; i < streams.length; i++) {
      const { unitRevenue } = streams[i];
      const summary = {};

      years.forEach((year) => {
        let sales = 0;
        markets.forEach((market) => {
          const checkMarket = streams[i][market] && streams[i][market][year];
          const value = checkMarket ? streams[i][market][year] : 0;
          sales = sales + value;
        });
        const revenue = sales * unitRevenue;
        const data = { sales, revenue };
        summary[year] = data;
      });
      result.push(summary);
    }
    return result;
  }
);

export const getUKRevenue = createSelector(
  (state) => state.entities.revenue,
  (revenue) => {
    console.log("getUKRevenue");
    console.log(revenue.data.streams);
    const years = ["y1", "y2", "y3", "y4", "y5"];
    const result = {};
    years.forEach((year) => {
      let value = 0;
      revenue.data.streams.forEach((stream) => {
        const unitRevenue = stream.unitRevenue || 0;
        let quantity = 0;
        // const quantity = stream["UK Market"][year] || 0;
        if (stream["UK Market"] && stream["UK Market"][year])
          quantity = stream["UK Market"][year];
        const combined = quantity * unitRevenue;
        value = value + combined;
      });
      result[year] = value;
    });

    return result;
  }
);

export const getAnnualRevenue = createSelector(
  (state) => state.entities.revenue,
  () => {
    console.log("getAnnualRevenue");
    const streams = getStreamTotals(store.getState());
    const years = ["y1", "y2", "y3", "y4", "y5"];
    const result = {};
    years.forEach((year) => {
      let total = 0;
      streams.forEach((stream) => {
        const count = stream[year].revenue || 0;
        total = total + count;
      });
      result[year] = total;
    });
    return result;
  }
);
