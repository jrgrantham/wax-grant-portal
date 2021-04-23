import { useSelector } from "react-redux";
import { getResources } from "./index";
import { getTaskIds } from "../store/projectData/tasks";
import { getWorkingDays } from "../store/projectData/project";
import { getTeamIds } from "../store/projectData/team";
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
    const companyDays = getWorkingDays(useSelector((state) => state));
    let rate = 0;
    if (dayRate) rate = dayRate;
    else {
      rate = salary / companyDays[leader];
    }
    rates[personId] = rate;
  });
  return rates;
}

export function getUtilisations() {
  const resources = getResources();
  const allTasks = useSelector((state) => state.tasks.data);
  const taskIds = getTaskIds(useSelector((state) => state));
  const people = useSelector((state) => state.team.data);
  const { projectLength } = useSelector((state) => state.project.data.details);

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
        const percent = resources[taskId][personId].percent;
        const days = allTasks[taskId].schedule[i].value;
        const contribution = (days * percent) / 100;
        counter[personId] = counter[personId] + contribution;
        // if end quarter check if over utilised, if so, push to array
        if (qEnd) {
          const quarterTotal = counter[personId]
          if (quarterTotal > 2) utilisations[personId].push(quarter)
          counter[personId] = 0
        };
        // special case for end of project partial quarter
      });
    });
  }

  console.log(utilisations);
  return utilisations;
}
