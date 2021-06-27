// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { setup } from "../../data";

const slice = createSlice({
  name: "setup",
  initialState: setup,
  reducers: {
    addToProjectList: (setup, action) => {
      const { key, value } = action.payload;
      setup.data[key].push(value);
    },
    removeFromProjectList: (setup, action) => {
      const { key, index } = action.payload;
      setup.data[key].splice(index, 1);
    },
    setProjectDefault: (setup, action) => {
      const { key, value } = action.payload;
      setup.data[key] = value;
    },
    updateProjectValue: (setup, action) => {
      const { key, value } = action.payload;
      setup.data[key] = value;
    },
    reorderProjectList: (setup, action) => {
      const { key, newIndex, originalIndex } = action.payload;
      const [entry] = setup.data[key].splice(originalIndex, 1);
      console.log(key, newIndex, originalIndex, entry);
      setup.data[key].splice(newIndex, 0, entry);
    },
  },
});

export const {
  addToProjectList,
  removeFromProjectList,
  setProjectDefault,
  updateProjectValue,
  reorderProjectList,
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
