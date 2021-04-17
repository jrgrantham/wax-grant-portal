// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    showGanttSummary: true,
    selectedLeader: "lead", // = user type if(pOne) else... or admin / lead
    selectedAdminOption: "project",
    selectedProjectOption: "project",
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