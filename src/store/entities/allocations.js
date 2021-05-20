// import axios from "axios";
import { store } from "../index";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { allocationData } from "../../data";
import { getTaskIds, getWorkPackageIds } from "./tasks";
import { getDayRateById } from "./team";
import { v4 as uuidv4 } from "uuid";

const slice = createSlice({
  name: "allocations",
  initialState: allocationData,
  reducers: {
    addAllocation: (allocations, action) => {
      const { taskId, personId, value } = action.payload;
      const allocation = {
        allocationId: uuidv4(),
        taskId,
        personId,
        percent: value,
      };
      allocations.data.push(allocation);
    },
    updateAllocation: (allocations, action) => {
      console.log(action.payload);
      const { allocationId, value } = action.payload;
      const index = allocations.data.findIndex(
        (allocation) => allocation.allocationId === allocationId
      );
      allocations.data[index].percent = value;
    },
    deleteAllocation: (allocations, action) => {
      const { allocationId } = action.payload;
      const index = allocations.data.findIndex(
        (allocation) => allocation.allocationId === allocationId
      );
      allocations.data.splice(index, 1);
    },
    deleteTaskAllocations: (allocations, action) => {
      const { taskId } = action.payload;
      const filtered = allocations.data.filter(
        (allocation) => allocation.taskId !== taskId
      );
      allocations.data = filtered;
    },
    deletePersonAllocations: (allocations, action) => {
      const { personId } = action.payload;
      const filtered = allocations.data.filter(
        (allocation) => allocation.personId !== personId
      );
      allocations.data = filtered;
    },
  },
});

export const {
  addAllocation,
  updateAllocation,
  deleteAllocation,
  deleteTaskAllocations,
  deletePersonAllocations,
} = slice.actions;
export default slice.reducer;

export const getAllocationsByTaskId = createSelector(
  (state) => state.entities,
  (entities) => {
    console.log("getAllocationsByTaskId");
    const team = entities.team.data;
    const taskData = entities.tasks.data;
    const allocations = entities.allocations.data;
    const taskKeys = Object.keys(taskData);
    const taskIds = taskKeys.filter((key) => key !== "taskOrder");

    const initialsById = {};
    team.forEach((person) => {
      initialsById[person.personId] = person.acronym;
    });

    const resources = {};
    taskIds.forEach((taskId) => {
      const peopleKeys = {};
      team.forEach((person) => {
        peopleKeys[person.personId] = {
          allocationId: "new",
          percent: 0,
        };
      });
      resources[taskId] = { completion: 0, people: "", ...peopleKeys };
    });

    for (let i = 0; i < allocations.length; i++) {
      let taskId = allocations[i].taskId;
      let personId = allocations[i].personId;
      let acronym = initialsById[personId];

      if (resources[taskId]["people"].length > 1) {
        resources[taskId]["people"] =
          resources[taskId]["people"] + ", " + acronym;
      } else {
        resources[taskId]["people"] = resources[taskId]["people"] + acronym;
      }
      resources[taskId]["completion"] =
        resources[taskId]["completion"] + allocations[i].percent;

      resources[taskId][personId].percent = allocations[i].percent;
      resources[taskId][personId].acronym = acronym;
      resources[taskId][personId].allocationId = allocations[i].allocationId;
    }
    return resources;
  }
);

export const getTotalDays = createSelector(
  (state) => state.entities,
  (entities) => {
    console.log("getTotalDays");
    const allTasks = entities.tasks.data;
    const people = entities.team.data;
    const taskIds = getTaskIds(store.getState());
    const resources = getAllocationsByTaskId(store.getState());

    const peoplesDays = {
      combined: {
        cost: 0,
        days: 0,
        staff: { cost: 0, days: 0 },
        subcontract: { cost: 0, days: 0 },
      },
      lead: {
        cost: 0,
        days: 0,
        staff: { cost: 0, days: 0 },
        subcontract: { cost: 0, days: 0 },
      },
      pOne: {
        cost: 0,
        days: 0,
        staff: { cost: 0, days: 0 },
        subcontract: { cost: 0, days: 0 },
      },
      pTwo: {
        cost: 0,
        days: 0,
        staff: { cost: 0, days: 0 },
        subcontract: { cost: 0, days: 0 },
      },
    };

    people.forEach((person) => {
      const { personId, leader, employment } = person;
      const rate = getDayRateById(store.getState())[personId];
      peoplesDays[personId] = 0;
      taskIds.forEach((taskId) => {
        const taskDays = allTasks[taskId].days;
        let percentage = 0;
        if (resources[taskId][personId].percent) {
          percentage = resources[taskId][personId].percent;
          const days = (taskDays * percentage) / 100;
          peoplesDays[personId] = peoplesDays[personId] + days;

          peoplesDays[leader].days = peoplesDays[leader].days + days;
          peoplesDays[leader].cost = peoplesDays[leader].cost + days * rate;

          peoplesDays[leader][employment].cost =
            peoplesDays[leader][employment].cost + days * rate;
          peoplesDays[leader][employment].days =
            peoplesDays[leader][employment].days + days;

          peoplesDays.combined.cost = peoplesDays.combined.cost + days * rate;
          peoplesDays.combined[employment].cost =
            peoplesDays.combined[employment].cost + days * rate;
          peoplesDays.combined[employment].days =
            peoplesDays.combined[employment].days + days;
        }
      });
    });
    return peoplesDays;
  }
);

export const getWorkPackageLabourCost = createSelector(
  (state) => state.entities,
  (entities) => {
    console.log("getWorkPackageCost");
    const allTasks = entities.tasks.data;
    const wpIds = getWorkPackageIds(store.getState());
    const dayRateById = getDayRateById(store.getState());

    const workPackageCost = {};
    wpIds.forEach((task) => {
      workPackageCost[task] = 0;
    });

    entities.allocations.data.forEach((allocation) => {
      const { percent, personId, taskId } = allocation;
      const days = (allTasks[taskId].days * percent) / 100;
      const cost = Math.round(days * dayRateById[personId]);
      const workPackage = allTasks[taskId].workPackageId;
      workPackageCost[workPackage] = workPackageCost[workPackage] + cost;
    });

    return workPackageCost;
  }
);
