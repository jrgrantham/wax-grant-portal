import { useSelector } from "react-redux";
import { getResources } from "./index";
import { getTaskIds } from "../store/projectData/tasks";

export function getTotalDaysByPersonId() {
  const allTasks = useSelector((state) => state.tasks.data);
  const people = useSelector((state) => state.team.data);
  const taskIds = getTaskIds(useSelector((state) => state));
  const resources = getResources();

  const peoplesDays = {};
  people.forEach((person) => {
    // const initials = person.acronym;
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

  return peoplesDays
}