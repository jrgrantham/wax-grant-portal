// import axios from "axios";
import { store } from "../index";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { projectData } from "../../data";
import moment from "moment";
import { getTotalDays } from "./allocations";

const slice = createSlice({
  name: "project",
  initialState: projectData,
  reducers: {
    updateSectionStatus: (project, action) => {
      const { section, leader } = action.payload;
      project.data.status[section][leader] = !project.data.status[section][
        leader
      ];
    },
    updateGanttStatus: (project) => {
      project.data.status.gantt = !project.data.status.gantt;
    },
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
  updateSectionStatus,
  updateGanttStatus,
} = slice.actions;
export default slice.reducer;

export const getProjectDates = createSelector(
  (state) => state.entities.project,
  (project) => {
    const { projectLength } = project.data.details;
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
  }
);

export const getWorkingDaysPerMonth = createSelector(
  (state) => state.entities.project.data,
  (data) => {
    console.log("getWorkingDaysPerMonth");
    function workedDays(leader) {
      const { bankHolidays, annualLeave } = data[leader];
      return (260 - bankHolidays - annualLeave) / 12;
    }
    const companyDays = {
      lead: workedDays("lead"),
      pOne: workedDays("pOne"),
      pTwo: workedDays("pTwo"),
    };
    return companyDays;
  }
);

export const getOverheads = createSelector(
  (state) => state.entities,
  (entities) => {
    const totalDays = getTotalDays(store.getState());

    function totalCost(leader) {
      return entities.project.data[leader].overheadRate;
    }
    function overhead(leader) {
      return totalDays[leader].cost;
    }

    const overheads = {
      lead: Math.round((totalCost("lead") * overhead("lead")) / 100),
      pOne: Math.round((totalCost("pOne") * overhead("pOne")) / 100),
      pTwo: Math.round((totalCost("pTwo") * overhead("pTwo")) / 100),
      combined: 0,
      category: "Overhead",
    };
    overheads.combined = overheads.lead + overheads.pOne + overheads.pTwo;

    return overheads;
  }
);

export const getFundingLevel = createSelector(
  (state) => state.entities.project.data,
  (data) => {
    const grants = {
      lead: data.lead.fundingLevel,
      pOne: data.pOne.fundingLevel,
      pTwo: data.pTwo.fundingLevel,
      combined: 0,
      category: "Grant",
    };
    grants.combined = grants.lead + grants.pOne + grants.pTwo;
    return grants;
  }
);
