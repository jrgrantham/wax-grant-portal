// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "capex",
  initialState: {
    loading: false,
    data: [
      {
        capexId: '123',
        condition: "New",
        leader: 'lead',
        description: 'capex number 1',
        depreciation: 3,
        currentValue: 1,
        residualValue: 120,
        utilisation: 10,
      },
    ],
    error: "",
  },
  reducers: {
    addCapex: (capex, action) => {
      const { newCapex, position } = action.payload;
      capex.data.splice(position, 0, newCapex);
    },
    deleteCapex: (capex, action) => {
      const index = capex.data.findIndex(
        (capex) => capex.capexId === action.payload.capexId
      );
      capex.data.splice(index, 1);
    },
    updateCapex: (capex, action) => {
      const { key, value, capexId } = action.payload;
      const index = capex.data.findIndex(
        (person) => person.capexId === capexId
      );
      capex.data[index][key] = value;
    },
    reorderCapex: (capex, action) => {
      const originalIndex = capex.data.findIndex(
        (capex) => capex.capexId === action.payload.capex.capexId
      );
      const newIndex = originalIndex + action.payload.movement;
      const [journey] = capex.data.splice(originalIndex, 1);
      capex.data.splice(newIndex, 0, journey);
    },
  },
});

export const {
  reorderCapex,
  updateCapex,
  addCapex,
  deleteCapex,
} = slice.actions;
export default slice.reducer;

export const getCapexCost = createSelector(
  (state) => state.entities.capex,
  (capex) => {
    console.log("getCapexCost");
    const costs = {
      lead: 0,
      pOne: 0,
      pTwo: 0,
      combined: 0,
    };
    capex.data.forEach((capex) => {
      const capexCost = capex.cost * capex.quantity;
      costs[capex.leader] = costs[capex.leader] + capexCost;
      costs.combined = costs.combined + capexCost
    });
    return costs;
  }
);
