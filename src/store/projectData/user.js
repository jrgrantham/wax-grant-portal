// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    userType: "admin",
    showGanttSummary: "",
    showComponent: "", // set component identifier
    selectedLeader: "lead", // default should be user
    selectedAdminOption: "project",
    selectedProjectOption: "company",
    selectedTeamOption: "staff",
    selectedCostsOption: "labour",
    selectedRevenueOption: "targetMarket",
  },
  reducers: {
    updateUserSelection: (user, action) => {
      user[action.payload.key] = action.payload.value;
    },
  },
});

export const { updateUserSelection } = slice.actions;
export default slice.reducer;
