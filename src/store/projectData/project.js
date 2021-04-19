// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { projectData } from "../../data";
import moment from "moment";

const slice = createSlice({
  name: "project",
  initialState: projectData,
  reducers: {
    updateProjectInfo: (project, action) => {
      project.data.details[action.payload.key] = action.payload.value;
    },
    updateLeaderInfo: (project, action) => {
      const { leader, key, value } = action.payload;
      project.data[leader][key] = value;
    },
    setProjectDefaults: (project, action) => {
      const { defaults } = action.payload;
      defaults.forEach((row) => {
        const { key, value } = row;
        project.data.details[key] = value;
      });
    },
    setCompanyDefaults: (project, action) => {
      const { defaults, leader } = action.payload;
      console.log(defaults, leader);
      defaults.forEach((row) => {
        const { key, value } = row;
        project.data[leader][key] = value;
      });
    },
  },
});

export const {
  updateProjectInfo,
  updateLeaderInfo,
  setProjectDefaults,
  setCompanyDefaults,
} = slice.actions;
export default slice.reducer;

export const getProjectDates = (state) => {
  const { projectLength } = state.project.data.details;
  const month = "Feb"; // hard coded !!!!!
  const year = 2021; // hard coded !!!!!
  const projectStart = moment(`${month} ${year}`, "MMM YYYY");
  const dateArray = () => {
    const years = [];
    const dateStart = projectStart;
    for (let i = 0; i < projectLength; i++) {
      years.push(dateStart.format("MMM YYYY"));
      dateStart.add(1, "month");
    }
    return years;
  };
  return dateArray();
};
