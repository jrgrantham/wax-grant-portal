// import axios from "axios";
import { store } from "../index";
import { createSlice } from "@reduxjs/toolkit";
import { getTaskIds } from "./tasks";
import { getWorkingDaysPerMonth } from "./project";
import { getAllocationsByTaskId } from "./allocations";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "revenue",
  initialState: {
    loading: false,
    error: "",
    data: {
      revenueStart: 2022,
      markets: [{ name: "UK Market", growth: 10, start: 500 }, {}],
    },
  },
  reducers: {
    updateMarket: (revenue, action) => {
      const { index, key, value } = action.payload;
      revenue.data.markets[index][key] = value;
    },
    addMarket: (revenue) => {
      revenue.data.markets.push({});
    },
    deleteMarket: (revenue, action) => {
      const { index } = action.payload;
      revenue.data.markets.splice(index, 1);
    },
    updateStart: (revenue, action) => {
      revenue.data.revenueStart = action.payload.year
    },
    addRevenueMember: (revenue, action) => {
      const { newPerson, position } = action.payload;
      revenue.data.splice(position, 0, newPerson);
    },
    deleteRevenueMember: (revenue, action) => {
      const index = revenue.data.findIndex(
        (person) => person.personId === action.payload.personId
      );
      revenue.data.splice(index, 1);
    },
    updateRevenueMember: (revenue, action) => {
      const { key, value, personId } = action.payload;
      const index = revenue.data.findIndex(
        (person) => person.personId === personId
      );
      if (key === "name") {
        const matches = value.match(/\b(\w)/g) || [];
        const acronym = matches.join("").slice(0, 2);
        revenue.data[index].name = value;
        revenue.data[index].acronym = acronym;
      } else if (key === "acronym") {
        const acronym = value.slice(-2);
        revenue.data[index].acronym = acronym;
      } else revenue.data[index][key] = value;
    },
    reorderRevenue: (revenue, action) => {
      const originalIndex = revenue.data.findIndex(
        (person) => person.personId === action.payload.person.personId
      );
      const newIndex = originalIndex + action.payload.movement;
      const [person] = revenue.data.splice(originalIndex, 1);
      revenue.data.splice(newIndex, 0, person);
    },
  },
});

export const {
  updateMarket,
  addMarket,
  deleteMarket,
  updateStart,
  updateRevenueStart,
  reorderRevenue,
  updateRevenueMember,
  addRevenueMember,
  deleteRevenueMember,
} = slice.actions;
export default slice.reducer;

export const getTeamIds = createSelector(
  (state) => state.entities.revenue,
  (revenue) => {
    console.log("getTeamIds");
    const teamIds = [];
    revenue.data.forEach((person) => {
      teamIds.push(person.personId);
    });
    return teamIds;
  }
);

export const getPersonById = createSelector(
  (state) => state.entities.revenue,
  (revenue) => {
    console.log("getPersonById");
    const teamIds = {};
    revenue.data.forEach((person) => {
      teamIds[person.personId] = person;
    });
    return teamIds;
  }
);

export const getDayRateById = createSelector(
  (state) => state.entities.revenue,
  (revenue) => {
    console.log("getDayRateById");
    const rates = {};
    revenue.data.forEach((person) => {
      const { salary, leader, dayRate, personId } = person;
      const daysPerMonth = getWorkingDaysPerMonth(store.getState());
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
//   const people = useSelector((state) => state.entities.revenue.data);
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
  (state) => state.entities,
  (entities) => {
    console.log("getUtilisations");
    // const state = useSelector((state) => state);
    const taskIds = getTaskIds(store.getState());
    const workingDays = getWorkingDaysPerMonth(store.getState());
    const personById = getPersonById(store.getState());
    const resources = getAllocationsByTaskId(store.getState());
    const allTasks = entities.tasks.data;
    const people = entities.revenue.data;
    const { projectLength } = entities.project.data.details;
    const utilisations = {};
    const utilisationByQuarter = { quarters: [] };
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
        for (let k = 0; k < personIds.length; k++) {
          let personId = personIds[k];
          // personIds.forEach((personId) => {
          const leader = personById[personId].leader;
          const percent = resources[taskId][personId].percent;
          const days = allTasks[taskId].schedule[i].value;
          const contribution = (days * percent) / 100;
          const quarterTotal = counter[personId] + contribution;
          counter[personId] = quarterTotal;
          if ((qEnd && lastTask) || (i === projectLength - 1 && lastTask)) {
            utilisationByQuarter[personId].actualDays.push(counter[personId]);
            if (k === personIds.length - 1)
              utilisationByQuarter.quarters.push(quarter);
            if (quarterTotal > workingDays[leader] * 3) {
              utilisationByQuarter[personId].overutilised = true;
              utilisations[personId].push(quarter); // set threshold
            }
            counter[personId] = 0;
          }
        }
        // });
      }
    }
    return utilisationByQuarter;
  }
);
