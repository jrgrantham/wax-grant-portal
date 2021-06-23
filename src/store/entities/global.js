// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { global } from "../../data";

const slice = createSlice({
  name: "global",
  initialState: global,
  reducers: {
    addToList: (global, action) => {
      const { key, value } = action.payload;
      global.data[key].push(value);
    },
    removeFromList: (global, action) => {
      const { key, index } = action.payload;
      global.data[key].splice(index, 1);
    },
    setDefault: (global, action) => {
      const { key, value } = action.payload;
      global.data[key] = value;
    },
    updateValue: (global, action) => {
      const { key, value } = action.payload;
      global.data[key] = value;
    },
  },
});

export const {
  addToList,
  removeFromList,
  setDefault,
  updateValue,
} = slice.actions;
export default slice.reducer;

export const getProjectDefaults = (state) => {
  console.log("getProjectDefaults");
  const { natureDefault, ipProtectionDefault } = state.entities.global.data;
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
  } = state.entities.global.data;
  const defaults = [
    { key: "organisationType", value: orgTypeDefault },
    { key: "organisationSize", value: orgSizeDefault },
    { key: "fundingLevel", value: fundingLevelDefault },
    { key: "matchFundingSource", value: matchFundingSourceDefault },
  ];
  return defaults;
};
