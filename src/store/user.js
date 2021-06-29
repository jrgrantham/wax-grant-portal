// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    admin: true,
    showComponent: "projectRoles", // set component identifier
    selectedLeader: "lead", // default should be the user
    selectedAdminOption: "project",
    selectedDetailsOption: "project",
    selectedTeamOption: "staff",
    selectedCostsOption: "labour",
    selectedRevenueOption: "target market",
    selectedSetupOption: "team",
    userChanges: [], // log changes to be sent at split intervals
    // log the end point, objectId, when the time comes, send the object from state
  },
  reducers: {
    updateUserSelection: (user, action) => {
      user[action.payload.key] = action.payload.value;
    },
  },
});

export const { updateUserSelection } = slice.actions;
export default slice.reducer;
