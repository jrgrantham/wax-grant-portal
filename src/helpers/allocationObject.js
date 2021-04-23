import { store } from "../store";

export function getTeamInitialsById() {
  const team = store.getState().team.data;
  const initialsById = {};
  team.forEach((person) => {
    initialsById[person.personId] = person.acronym;
  });
  return initialsById;
}

export function getResources() {
  const resources = {};
  const team = store.getState().team.data;
  const taskData = store.getState().tasks.data;
  const allocations = store.getState().allocations.data;
  const taskKeys = Object.keys(taskData);
  const taskIds = taskKeys.filter((key) => key !== "taskOrder");
  const initialsById = getTeamInitialsById();

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
    let acronym = initialsById[personId]

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
