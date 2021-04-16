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
    updateLeaderInfo: (project, action) => {
      const {leader, key, value} = action.payload;
      project.data[leader][key] = value;
    },
  },
});

export const { updateProjectInfo, updateLeaderInfo } = slice.actions;
export default slice.reducer;
