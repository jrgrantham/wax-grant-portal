// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { getTaskIds } from "./tasks";
import { getWorkingDaysPerMonth } from "./project";
import { getAllocationsByTaskId } from "./allocations";
import { createSelector } from "reselect";
import { team } from "../../data";

const slice = createSlice({
  name: "team",
  initialState: team,
  reducers: {
    addTeamMember: (team, action) => {
      const { newPerson, position } = action.payload;
      team.data.splice(position, 0, newPerson);
    },
    deleteTeamMember: (team, action) => {
      const index = team.data.findIndex(
        (person) => person.personId === action.payload.personId
      );
      team.data.splice(index, 1);
    },
    updateTeamMember: (team, action) => {
      const { key, value, personId } = action.payload;
      const index = team.data.findIndex(
        (person) => person.personId === personId
      );
      if (key === "name") {
        const matches = value.match(/\b(\w)/g) || [];
        const acronym = matches.join("").slice(0, 2);
        team.data[index].name = value;
        team.data[index].acronym = acronym;
      } else if (key === "acronym") {
        const acronym = value.slice(-2);
        team.data[index].acronym = acronym;
      } else team.data[index][key] = value;
    },
    reorderTeam: (team, action) => {
      const originalIndex = team.data.findIndex(
        (person) => person.personId === action.payload.person.personId
      );
      const newIndex = originalIndex + action.payload.movement;
      const [person] = team.data.splice(originalIndex, 1);
      team.data.splice(newIndex, 0, person);
    },
  },
});

export const {
  reorderTeam,
  updateTeamMember,
  addTeamMember,
  deleteTeamMember,
} = slice.actions;
export default slice.reducer;

export const getTeamIds = createSelector(
  (state) => state.team,
  (team) => {
    console.log("getTeamIds");
    const teamIds = [];
    team.data.forEach((person) => {
      teamIds.push(person.personId);
    });
    return teamIds;
  }
);

export const getPersonById = createSelector(
  (state) => state.team,
  (team) => {
    console.log("getPersonById");
    const teamIds = {};
    team.data.forEach((person) => {
      teamIds[person.personId] = person;
    });
    return teamIds;
  }
);

export const getDayRateById = createSelector(
  (state) => state,
  (state) => {
    console.log("getDayRateById");
    const rates = {};
    state.team.data.forEach((person) => {
      const { salary, leader, dayRate, personId } = person;
      const daysPerMonth = getWorkingDaysPerMonth(state);
      let rate = 0;
      if (dayRate) rate = dayRate;
      else {
        rate = salary / (daysPerMonth[leader] * 12);
      }
      rates[personId] = rate;
    });
    return rates;
  }
);

// export function getDayRateById() {
//   const people = useSelector((state) => state.team.data);
//   const rates = {};
//   people.forEach((person) => {
//     const { salary, leader, dayRate, personId } = person;
//     const companyDays = getWorkingDaysPerMonth(useSelector((state) => state));
//     let rate = 0;
//     if (dayRate) rate = dayRate;
//     else {
//       rate = salary / (companyDays[leader] * 12);
//     }
//     rates[personId] = rate;
//   });
//   return rates;
// }

export const getUtilisations = createSelector(
  (state) => state,
  (state) => {
    console.log("getUtilisations");
    // const state = useSelector((state) => state);
    const taskIds = getTaskIds(state);
    const workingDays = getWorkingDaysPerMonth(state);
    const personById = getPersonById(state);
    const resources = getAllocationsByTaskId(state);
    const allTasks = state.tasks.data;
    const people = state.team.data;
    const { projectLength } = state.project.data.details;
    const utilisations = {};
    const utilisationByQuarter = {};
    const counter = {};
    const personIds = [];
    people.forEach((person) => {
      const id = person.personId;
      utilisations[id] = [];
      utilisationByQuarter[id] = {};
      utilisationByQuarter[id].overutilised = false;
      utilisationByQuarter[id].maxDays = workingDays[person.leader] * 3;
      utilisationByQuarter[id].actualDays = [];
      counter[id] = 0;
      personIds.push(id);
    });

    for (let i = 0; i < projectLength; i++) {
      let quarter = `Q${Math.ceil((i + 1) / 3)}`;
      let qEnd = (i + 1) % 3 === 0;
      for (let j = 0; j < taskIds.length; j++) {
        let lastTask = j === taskIds.length - 1;
        let taskId = taskIds[j];

        personIds.forEach((personId) => {
          const leader = personById[personId].leader;
          const percent = resources[taskId][personId].percent;
          const days = allTasks[taskId].schedule[i].value;
          const contribution = (days * percent) / 100;
          const quarterTotal = counter[personId] + contribution;
          counter[personId] = quarterTotal;
          if ((qEnd && lastTask) || (i === projectLength - 1 && lastTask)) {
            utilisationByQuarter[personId].actualDays.push(counter[personId]);
            if (quarterTotal > workingDays[leader] * 3) {
              utilisationByQuarter[personId].overutilised = true;
              utilisations[personId].push(quarter); // set threshold
            }
            counter[personId] = 0;
          }
        });
      }
    }
    return utilisationByQuarter;
  }
);
