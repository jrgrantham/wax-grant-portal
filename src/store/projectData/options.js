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
  } = state.options.data;
  const defaults = [
    { key: 'nature', value: natureDefault },
    { key: 'ipProtection', value: ipProtectionDefault },
  ]
  return defaults
}

export const getCompanyDefaults = (state) => {
  const {
    orgTypeDefault,
    orgSizeDefault,
    fundingLevelDefault,
    matchFundingSourceDefault
  } = state.options.data;
  const defaults = [
    {key: 'organisationType', value: orgTypeDefault},
    {key: 'organisationSize', value: orgSizeDefault},
    {key: 'fundingLevel', value: fundingLevelDefault},
    {key: 'matchFundingSource', value: matchFundingSourceDefault},
  ]
  return defaults
}