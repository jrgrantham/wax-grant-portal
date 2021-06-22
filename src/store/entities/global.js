// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { options } from "../../data";

const slice = createSlice({
  name: "global",
  initialState: options,
  // reducers: {

  // },
});

// export const {
// } = slice.actions;
export default slice.reducer;

// export const getProjectDefaults = (state) => {
//   console.log('getProjectDefaults');
//   const { natureDefault, ipProtectionDefault } = state.entities.options.data;
//   const defaults = [
//     { key: "nature", value: natureDefault },
//     { key: "ipProtection", value: ipProtectionDefault },
//   ];
//   return defaults;
// };

// export const getCompanyDefaults = (state) => {
//   console.log('getCompanyDefaults');
//   const {
//     orgTypeDefault,
//     orgSizeDefault,
//     fundingLevelDefault,
//     matchFundingSourceDefault,
//   } = state.entities.options.data;
//   const defaults = [
//     { key: "organisationType", value: orgTypeDefault },
//     { key: "organisationSize", value: orgSizeDefault },
//     { key: "fundingLevel", value: fundingLevelDefault },
//     { key: "matchFundingSource", value: matchFundingSourceDefault },
//   ];
//   return defaults;
// };
