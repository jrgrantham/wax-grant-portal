// import axios from "axios";
import {store} from '../index'
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { allocationData } from "../../data";
import { getTaskIds } from "./tasks";
import { getDayRateById } from "./team";
import { v4 as uuidv4 } from "uuid";

const slice = createSlice({
  name: "assignments",
  initialState: allocationData,
  reducers: {
    addAllocation: (assignments, action) => {
      const { taskId, personId, value } = action.payload;
      const allocation = {
        allocationId: uuidv4(),
        taskId,
        personId,
        percent: value,
      };
      assignments.data.push(allocation);
    },
    updateAllocation: (assignments, action) => {
      console.log(action.payload);
      const { allocationId, value } = action.payload;
      const index = assignments.data.findIndex(
        (allocation) => allocation.allocationId === allocationId
      );
      assignments.data[index].percent = value;
    },
    deleteAllocation: (assignments, action) => {
      const { allocationId } = action.payload;
      const index = assignments.data.findIndex(
        (allocation) => allocation.allocationId === allocationId
      );
      assignments.data.splice(index, 1);
    },
    deleteTaskassignments: (assignments, action) => {
      const { taskId } = action.payload;
      const filtered = assignments.data.filter(
        (allocation) => allocation.taskId !== taskId
      );
      assignments.data = filtered;
    },
    deletePersonassignments: (assignments, action) => {
      const { personId } = action.payload;
      const filtered = assignments.data.filter(
        (allocation) => allocation.personId !== personId
      );
      assignments.data = filtered;
    },
  },
});

export const {
  addAllocation,
  updateAllocation,
  deleteAllocation,
  deleteTaskassignments,
  deletePersonassignments,
} = slice.actions;
export default slice.reducer;

export const getassignmentsByTaskId = createSelector(
  (state) => state.entities,
  (entities) => {
    console.log("getassignmentsByTaskId");
    const team = entities.team.data;
    const taskData = entities.tasks.data;
    const assignments = entities.assignments.data;
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

    for (let i = 0; i < assignments.length; i++) {
      let taskId = assignments[i].taskId;
      let personId = assignments[i].personId;
      let acronym = initialsById[personId];

      if (resources[taskId]["people"].length > 1) {
        resources[taskId]["people"] =
          resources[taskId]["people"] + ", " + acronym;
      } else {
        resources[taskId]["people"] = resources[taskId]["people"] + acronym;
      }
      resources[taskId]["completion"] =
        resources[taskId]["completion"] + assignments[i].percent;

      resources[taskId][personId].percent = assignments[i].percent;
      resources[taskId][personId].acronym = acronym;
      resources[taskId][personId].allocationId = assignments[i].allocationId;
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
    const resources = getassignmentsByTaskId(store.getState());

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
