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
          "UK Market": { y1: 10, y2: 20 },
          "US Market": {},
          "Asia Market": {},
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
      const { streamIndex, market, value } = action.payload;
      console.log(streamIndex, market, value);
      revenue.data.streams[streamIndex][market] = value;
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

export const getStreamTotals = createSelector(
  (state) => state.entities.revenue,
  (revenue) => {
    console.log("getTotalRevenue");

    const markets = [];
    revenue.data.markets.forEach((market) => {
      markets.push(market.name);
    });

    const result = []
    const years = [ "y1", "y2", "y3", "y4", "y5" ];
    revenue.data.streams.forEach((stream) => {
    });

    return result;
  }
);
