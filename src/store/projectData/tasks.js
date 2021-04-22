import { createAction, createSlice } from "@reduxjs/toolkit";
import { taskData2 } from "../../data";

export const wPFetchRequest = createAction("wPFetchRequest");
export const wPFetchSuccess = createAction("wPFetchSuccess");
export const wPFetchFailure = createAction("wPFetchFailure");

export const setTaskBars = createAction("setTaskBars");
export const updateTaskKeyValue = createAction("updateTaskKeyValue");
export const updateTaskDays = createAction("updateTaskDays");
export const updateTaskPack = createAction("updateTaskPack"); // formik modal
export const updateTaskBlock = createAction("updateTaskBlock");
export const updateTaskPackTitle = createAction("updateTaskPackTitle");

//     case wPFetchRequest.type:
//       return {
//         ...state,
//         loading: true,
//     case wPFetchSuccess.type:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         error: "",
//     case wPFetchFailure.type:
//       return {
//         data: [],
//         loading: false,
//         error: "failed to fetch gantt",

function emptyTask() {
  const emptyTask = {
    description: "new task",
    days: 1,
    startDep: null,
    endDep: null,
    dayLoading: "front",
    schedule: [{ barNumber: 1, value: 1 }],
  };
  return emptyTask;
}

const slice = createSlice({
  name: "tasks",
  initialState: taskData2,
  reducers: {
    // individual tasks
    addTask: (tasks, action) => {
      const {
        lastTaskId,
        workPackageId,
        workPackageTitle,
        projectLength,
      } = action.payload;
      const newId = `task${tasks.data.taskOrder.length + 1}`;
      const index =
        tasks.data.taskOrder.findIndex((task) => task === lastTaskId) + 1;
      const newTask = emptyTask();
      newTask.taskId = newId;
      newTask.workPackageId = workPackageId;
      newTask.workPackageTitle = workPackageTitle;
      // newTask.schedule = schedule;
      tasks.data.taskOrder.splice(index, 0, newId);
      for (let i = 1; i < projectLength; i++) {
        newTask.schedule[i] = { barNumber: 0, value: 0 };
      }
      tasks.data[newId] = newTask;
    },
    deleteTask: (tasks, action) => {
      const { taskId } = action.payload;
      delete tasks.data[taskId];
      const index = tasks.data.taskOrder.findIndex((task) => task === taskId);
      tasks.data.taskOrder.splice(index, 1);
    },
    updateTaskKey: (tasks, action) => {
      const { taskId, key, value } = action.payload;
      tasks.data[taskId][key] = value;
    },
    // replaceTaskSchedule: (tasks, action) => {
    //   // what is this? replace schedule??
    //   const { taskId, value } = action.payload;
    //   tasks.data[taskId].schedule = value;
    // },
    resizeTaskBar: (tasks, action) => {
      const {
        taskId,
        newDays,
        origStartIndex,
        newStartIndex,
        origEndIndex,
        newEndIndex,
        barNumber,
      } = action.payload;
      tasks.data[taskId].days = newDays; // set days
      // calculate new block positions
      const loopStart = Math.min(origStartIndex, newStartIndex);
      const loopEnd = Math.max(origEndIndex, newEndIndex);
      let workingDay = false;
      let started = false;
      for (let i = loopStart; i <= loopEnd; i++) {
        if (!started && i >= newStartIndex) {
          workingDay = true;
          started = true;
        }
        if (started && i > newEndIndex) {
          workingDay = false;
        }
        if (workingDay) tasks.data[taskId].schedule[i].barNumber = barNumber;
        else tasks.data[taskId].schedule[i].barNumber = 0;
      }
    },
    spreadWork: (tasks, action) => {
      const { taskId, combinedLength } = action.payload;
      const { days } = tasks.data[taskId];
      const months = Math.floor(days / combinedLength);
      const remainderMonths = days % combinedLength;
      let j = 0;
      for (let i = 0; i < tasks.data[taskId].schedule.length; i++) {
        if (tasks.data[taskId].schedule[i].barNumber) {
          // was status
          if (j < remainderMonths) {
            tasks.data[taskId].schedule[i].value = months + 1;
            j++;
          } else tasks.data[taskId].schedule[i].value = months;
        }
      }
    },
    moveTaskBar: (tasks, action) => {
      const { taskId, originalIndex, newIndex, blockCount } = action.payload;
      const movement = newIndex - originalIndex;
      const bar = tasks.data[taskId].schedule.splice(originalIndex, blockCount);
      tasks.data[taskId].schedule.splice(originalIndex + movement, 0, ...bar);
    },
    updateBlock: (tasks, action) => {
      const { taskId, blockIndex, value } = action.payload;
      const change = value - tasks.data[taskId].schedule[blockIndex].value
      console.log(change);
      tasks.data[taskId].schedule[blockIndex].value = value;
      tasks.data[taskId].days = tasks.data[taskId].days + change;
    },
    // pack operations
    renameTaskPack: (tasks, action) => {},
    reorderTasks: (tasks, action) => {
      console.log("reordering");
      const { taskId, movement } = action.payload;
      const originalIndex = tasks.data.taskOrder.findIndex(
        (task) => task === taskId
      );
      console.log(originalIndex);
      const newIndex = originalIndex + movement;
      const [movedTask] = tasks.data.taskOrder.splice(originalIndex, 1);
      tasks.data.taskOrder.splice(newIndex, 0, movedTask);
    },
  },
});

export const {
  addTask,
  moveTaskBar,
  resizeTaskBar,
  spreadWork,
  reorderTasks,
  deleteTask,
  updateBlock,
  updateTaskKey,
} = slice.actions;
export default slice.reducer;

export const getWorkPackageTitles = (state) => {
  const list = Object.keys(state.tasks.data);
  const taskIds = list.filter((id) => id !== "taskOrder");
  const titles = [
    ...new Set(
      taskIds.map((taskId) => state.tasks.data[taskId].workPackageTitle)
    ),
  ];
  return titles;
};
export const getTaskIds = (state) => {
  const list = Object.keys(state.tasks.data);
  const taskIds = list.filter((id) => id !== "taskOrder");
  return taskIds;
};
