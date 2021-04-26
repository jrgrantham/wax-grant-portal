import { useSelector } from "react-redux";
import { getResources } from "./index";
import { getTaskIds } from "../store/projectData/tasks";
import { getWorkingDaysPerMonth } from "../store/projectData/project";
import { getTeamIds, getPersonById } from "../store/projectData/team";
import { countBy } from "underscore";

export function getTotalDaysByPersonId() {
  const allTasks = useSelector((state) => state.tasks.data);
  const people = useSelector((state) => state.team.data);
  const taskIds = getTaskIds(useSelector((state) => state));
  const resources = getResources();

  const peoplesDays = {};
  people.forEach((person) => {
    const personId = person.personId;
    peoplesDays[personId] = 0;
    taskIds.forEach((taskId) => {
      const taskDays = allTasks[taskId].days;
      let percentage = 0;
      if (resources[taskId][personId].percent) {
        percentage = resources[taskId][personId].percent;
        const days = (taskDays * percentage) / 100;
        peoplesDays[personId] = peoplesDays[personId] + days;
      }
    });
  });
  return peoplesDays;
}

export function getDayRateById() {
  const people = useSelector((state) => state.team.data);
  const rates = {};
  people.forEach((person) => {
    const { salary, leader, dayRate, personId } = person;
    const companyDays = getWorkingDaysPerMonth(useSelector((state) => state));
    let rate = 0;
    if (dayRate) rate = dayRate;
    else {
      rate = salary / (companyDays[leader] * 12);
    }
    rates[personId] = rate;
  });
  return rates;
}

export function getUtilisations() {
  const state = useSelector((state) => state);
  const taskIds = getTaskIds(state);
  const workingDays = getWorkingDaysPerMonth(state);
  const personById = getPersonById(state);
  const personById2 = getPersonById(state);
  const resources = getResources();
  const allTasks = useSelector((state) => state.tasks.data);
  const people = useSelector((state) => state.team.data);
  const { projectLength } = useSelector((state) => state.project.data.details);

  console.log(personById === personById2);

  const utilisations = {};
  const counter = {};
  const personIds = [];
  people.forEach((person) => {
    const id = person.personId;
    utilisations[id] = [];
    counter[id] = 0;
    personIds.push(id);
  });

  for (let i = 0; i < projectLength; i++) {
    let quarter = `Q${Math.ceil((i + 1) / 3)}`;
    let qEnd = (i + 1) % 3 === 0;
    // console.log(quarter, qEnd);
    taskIds.forEach((taskId) => {
      personIds.forEach((personId) => {
        const leader = personById[personId].leader;
        const percent = resources[taskId][personId].percent;
        const days = allTasks[taskId].schedule[i].value;
        const contribution = (days * percent) / 100;
        const quarterTotal = counter[personId] + contribution;
        counter[personId] = quarterTotal;
        if (qEnd) {
          if (quarterTotal > workingDays[leader] * 3)
            utilisations[personId].push(quarter); // set threshold
          counter[personId] = 0;
        }
        if (!qEnd && i === projectLength - 1) {
          const months = (i + 1) % 3;
          if (quarterTotal > workingDays[leader] * months)
            utilisations[personId].push(quarter);
        }
        // special case for end of project partial quarter
      });
    });
  }
  return utilisations;
}
