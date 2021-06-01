// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "other",
  initialState: {
    loading: false,
    data: [
      {
        leader: "lead",
        description: "walking boots",
        cost: 120,
        otherId: "1234",
      },
    ],
    error: "",
  },
  reducers: {
    addOther: (other, action) => {
      const { newOther, position } = action.payload;
      other.data.splice(position, 0, newOther);
    },
    deleteOther: (other, action) => {
      const index = other.data.findIndex(
        (other) => other.otherId === action.payload.otherId
      );
      other.data.splice(index, 1);
    },
    updateOther: (other, action) => {
      const { key, value, otherId } = action.payload;
      const index = other.data.findIndex(
        (person) => person.otherId === otherId
      );
      other.data[index][key] = value;
    },
    reorderOther: (other, action) => {
      const originalIndex = other.data.findIndex(
        (other) => other.otherId === action.payload.other.otherId
      );
      const newIndex = originalIndex + action.payload.movement;
      const [journey] = other.data.splice(originalIndex, 1);
      other.data.splice(newIndex, 0, journey);
    },
  },
});

export const {
  reorderOther,
  updateOther,
  addOther,
  deleteOther,
} = slice.actions;
export default slice.reducer;

export const getOtherCost = createSelector(
  (state) => state.entities.other,
  (other) => {
    console.log("getOtherCost");
    const costs = {
      lead: 0,
      pOne: 0,
      pTwo: 0,
      combined: 0,
      category: "Other",
      breakdown: {
        lead: [],
        pOne: [],
        pTwo: [],
      },
    };
    other.data.forEach((other) => {
      const { cost, leader, description, otherId } = other;
      costs[leader] = costs[leader] + cost;
      costs.combined = costs.combined + cost;
      costs.breakdown[leader].push({ description, cost, otherId });
    });
    return costs;
  }
);

export const getOtherIds = createSelector(
  (state) => state.entities.other,
  (other) => {
    console.log("getOtherIds");
    const ids = {
      lead: [],
      pOne: [],
      pTwo: [],
    };
    other.data.forEach((other) => {
      const { leader, otherId } = other;
      ids[leader].push(otherId);
    });
    console.log(ids);
    return ids;
  }
);
