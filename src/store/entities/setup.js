// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { setup } from "../../data";

const slice = createSlice({
  name: "setup",
  initialState: setup,
  reducers: {
    addToList: (setup, action) => {
      const { key, value } = action.payload;
      setup.data[key].push(value);
    },
    removeFromList: (setup, action) => {
      const { key, index } = action.payload;
      setup.data[key].splice(index, 1);
    },
    setDefault: (setup, action) => {
      const { key, value } = action.payload;
      setup.data[key] = value;
    },
    updateValue: (setup, action) => {
      const { key, value } = action.payload;
      setup.data[key] = value;
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
  const { natureDefault, ipProtectionDefault } = state.entities.setup.data;
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
  } = state.entities.setup.data;
  const defaults = [
    { key: "organisationType", value: orgTypeDefault },
    { key: "organisationSize", value: orgSizeDefault },
    { key: "fundingLevel", value: fundingLevelDefault },
    { key: "matchFundingSource", value: matchFundingSourceDefault },
  ];
  return defaults;
};
