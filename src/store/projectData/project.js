// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { projectData } from "../../data";

const slice = createSlice({
  name: "project",
  initialState: projectData,
  reducers: {
    updateProjectInfo: (project, action) => {
      project.data.details[action.payload.key] = action.payload.value;
    },
    updateLeadInfo: (project, action) => {
      project.data.lead[action.payload.key] = action.payload.value;
    },
    updatepOneInfo: (project, action) => {
      project.data.pOne[action.payload.key] = action.payload.value;
    },
    updatepTwoInfo: (project, action) => {
      project.data.pTwo[action.payload.key] = action.payload.value;
    },
  },
});

export const { updateProjectInfo } = slice.actions;
export default slice.reducer;
