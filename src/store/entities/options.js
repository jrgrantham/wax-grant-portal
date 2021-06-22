// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { options } from "../../data";

const slice = createSlice({
  name: "options",
  initialState: options,
  reducers: {
    addToList: (options, action) => {
      const { key, value } = action.payload;
      options.data[key].push(value);
    },
    removeFromList: (options, action) => {
      const { key, index } = action.payload;
      options.data[key].splice(index, 1)
    },
    setDefault: (options, action) => {
      const { key, value } = action.payload;
      options.data[key] = value
    },
  },
});

export const { addToList, removeFromList, setDefault } = slice.actions;
export default slice.reducer;

export const getProjectDefaults = (state) => {
  console.log("getProjectDefaults");
  const { natureDefault, ipProtectionDefault } = state.entities.options.data;
  const defaults = [
    { key: "nature", value: natureDefault },
    { key: "ipProtection", value: ipProtectionDefault },
  ];
  return defaults;
};

export const getCompanyDefaults = (state) => {
  console.log("getCompanyDefaults");
  const {
    orgTypeDefault,
    orgSizeDefault,
    fundingLevelDefault,
    matchFundingSourceDefault,
  } = state.entities.options.data;
  const defaults = [
    { key: "organisationType", value: orgTypeDefault },
    { key: "organisationSize", value: orgSizeDefault },
    { key: "fundingLevel", value: fundingLevelDefault },
    { key: "matchFundingSource", value: matchFundingSourceDefault },
  ];
  return defaults;
};
