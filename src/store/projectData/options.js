// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { options } from "../../data";

const slice = createSlice({
  name: "options",
  initialState: options,
  // reducers: {
    
  // },
});

// export const {
// } = slice.actions;
export default slice.reducer;



export const getProjectDefaults = (state) => {
  const {
    natureDefault,
    ipProtectionDefault,
    fundingLevelDefault,
  } = state.options.data;

  const defaults = [
    { key: 'nature', value: natureDefault },
    { key: 'ipProtection', value: ipProtectionDefault },
    // { nature: natureDefault },
  ]
  return defaults
}