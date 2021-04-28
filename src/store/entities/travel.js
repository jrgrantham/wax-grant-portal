// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "travel",
  initialState: {
    loading: false,
    data: [
      {
        leader: "lead",
        description: "visit Paris",
        quantity: 1,
        cost: 120,
        travelId: "1234",
      },
    ],
    error: "",
  },
  reducers: {
    addTravel: (travel, action) => {
      const { newTravel, position } = action.payload;
      travel.data.splice(position, 0, newTravel);
    },
    deleteTravel: (travel, action) => {
      const index = travel.data.findIndex(
        (travel) => travel.travelId === action.payload.travelId
      );
      travel.data.splice(index, 1);
    },
    updateTravel: (travel, action) => {
      const { key, value, travelId } = action.payload;
      const index = travel.data.findIndex(
        (person) => person.travelId === travelId
      );
      travel.data[index][key] = value;
    },
    reorderTravel: (travel, action) => {
      const originalIndex = travel.data.findIndex(
        (travel) => travel.travelId === action.payload.travel.travelId
      );
      const newIndex = originalIndex + action.payload.movement;
      const [journey] = travel.data.splice(originalIndex, 1);
      travel.data.splice(newIndex, 0, journey);
    },
  },
});

export const {
  reorderTravel,
  updateTravel,
  addTravel,
  deleteTravel,
} = slice.actions;
export default slice.reducer;

export const getTravelCost = createSelector(
  (state) => state.entities.travel,
  (travel) => {
    console.log("getTravelCost");
    const costs = {
      lead: 0,
      pOne: 0,
      pTwo: 0,
      combined: 0,
    };
    travel.data.forEach((travel) => {
      const travelCost = travel.cost * travel.quantity;
      costs[travel.leader] = costs[travel.leader] + travelCost;
      costs.combined = costs.combined + travelCost
    });
    return costs;
  }
);
