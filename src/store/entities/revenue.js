// import axios from "axios";
import { store } from "../index";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "revenue",
  initialState: {
    loading: false,
    error: "",
    data: {
      revenueStart: 2022,
      markets: [
        { name: "UK Market", growth: 10, start: 500 },
        { name: "Global", growth: 10, start: 500 },
      ],
      streams: [
        {
          name: "Rubber Toys",
          unitRevenue: 5,
          "UK Market": { y1: 10, y2: 20 },
          "US Market": {},
          "Asia Market": {},
        },
        {
          // name: "Rubber Toys",
          unitRevenue: 7,
          "UK Market": { y1: 10, y2: 20 },
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
    // make sure to update streams
    updateStart: (revenue, action) => {
      revenue.data.revenueStart = action.payload.year;
    },
    updateStream: (revenue, action) => {
      const { streamIndex, market, year, value } = action.payload;
      const streams = revenue.data.streams;
      console.log(streamIndex, market, value);
      if (!streams[streamIndex][market]) streams[streamIndex][market] = {};
      streams[streamIndex][market][year] = value;
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
  updateStart,
  updateStream,
  addStream,
  deleteStream,
} = slice.actions;
export default slice.reducer;

export const getSelectedMarkets = createSelector(
  (state) => state.entities.revenue,
  (revenue) => {
    console.log("getSelectedMarkets");
    const markets = [];
    revenue.data.markets.forEach((market) => {
      if (market.name === "Global") return;
      markets.push(market.name);
    });
    return markets;
  }
);

export const getStreamTotals = createSelector(
  (state) => state.entities.revenue,
  (revenue) => {
    console.log("getStreamTotals");
    const { streams } = revenue.data;
    const markets = getSelectedMarkets(store.getState());
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
        const revenue = sales * unitRevenue
        const data = {sales, revenue}
        summary[year] = data;
      });
      result.push(summary);
    }
    return result;
  }
);

export const getTotalRevenue = createSelector(
  (state) => state.entities.revenue,
  () => {
    console.log("getTotalRevenue");
    const streams = getStreamTotals(store.getState());
    const years = ["y1", "y2", "y3", "y4", "y5"];

    const result = {};
    years.forEach((year) => {
      let total = 0;
      for (let i = 0; i < streams.length; i++) {
        const count = streams[i][year].revenue || 0;
        total = total + count;
      }
      result[year] = total;
    });

    return result;
  }
);
