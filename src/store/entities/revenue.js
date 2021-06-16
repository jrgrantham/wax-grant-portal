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
      markets: [{ name: "UK Market", growth: 10, start: 500 }, {}],
      streams: [
        { 
          name: "Rubber Toys",
          markets: {}
       },
      ],
    },
  },
  reducers: {
    updateMarket: (revenue, action) => {
      const { index, key, value } = action.payload;
      revenue.data.markets[index][key] = value;
    },
    addMarket: (revenue) => {
      revenue.data.markets.push({});
    },
    deleteMarket: (revenue, action) => {
      const { index } = action.payload;
      revenue.data.markets.splice(index, 1);
    },
    // make sure to update revenue
    updateStart: (revenue, action) => {
      revenue.data.revenueStart = action.payload.year;
    },
  },
});

export const {
  updateMarket,
  addMarket,
  deleteMarket,
  updateStart,
} = slice.actions;
export default slice.reducer;
