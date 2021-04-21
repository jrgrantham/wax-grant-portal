// import axios from "axios";
// import { v4 as uuidv4 } from "uuid";

import { createAction, createSlice } from "@reduxjs/toolkit";
import { taskData2 } from "../../data";
// import {
//   reorderArrayByIndex,
//   wPUpdateDays,
//   updateEditedWp,
//   wPUpdateBlock,
//   wPCreateNewRow,
// } from "../../helpers";

export const wPFetchRequest = createAction("wPFetchRequest");
export const wPFetchSuccess = createAction("wPFetchSuccess");
export const wPFetchFailure = createAction("wPFetchFailure");

// export const addTask = createAction("addTask");
export const removeTask = createAction("removeTask");
export const removeTaskPack = createAction("removeTaskPack");
export const setTaskBars = createAction("setTaskBars");
export const reorderTasks = createAction("reorderTasks");
export const updateTaskKeyValue = createAction("updateTaskKeyValue");
export const updateTaskDays = createAction("updateTaskDays");
export const updateTaskPack = createAction("updateTaskPack"); // formik modal
export const updateTaskBlock = createAction("updateTaskBlock");
export const updateTaskPackTitle = createAction("updateTaskPackTitle");
// export const moveTaskBar = createAction("moveTaskBar");

// const initialState = {
//   loading: false,
//   data: [],
//   error: "",
// };

// export default function taskReducer(state = taskData, action) {
//   // export default function taskReducer(state = initialState, action) {
//   switch (action.type) {
//     case wPFetchRequest.type:
//       return {
//         ...state,
//         loading: true,
//       };
//     case wPFetchSuccess.type:
//       return {
//         ...state,
//         loading: false,
//         data: action.payload,
//         error: "",
//       };
//     case wPFetchFailure.type:
//       return {
//         data: [],
//         loading: false,
//         error: "failed to fetch gantt",
//       };
//     case reorderTasks.type:
//       const taskId = action.payload.task.taskId;
//       const originalIndex = state.data
//         .map(function (obj) {
//           return obj.taskId;
//         })
//         .indexOf(taskId);
//       const newIndex = originalIndex + action.payload.movement;
//       const reordered = reorderArrayByIndex(
//         state.data,
//         originalIndex,
//         newIndex
//       );
//       return {
//         ...state,
//         data: reordered,
//       };
//     case moveTaskBar.type:
//       return {
//         ...state,
//         data: state.data.map((task) => {
//           if (task.taskId === action.payload.taskId) {
//             return action.payload;
//           }
//           return task;
//         }),
//       };
//     case addTask.type:
//       const { projectLength, title } = action.payload;
//       const newRow = wPCreateNewRow(projectLength, title);
//       return {
//         ...state,
//         data: [...state.data, newRow],
//       };
//     case removeTask.type:
//       return {
//         ...state,
//         data: state.data.filter((task) => task.taskId !== action.payload),
//       };
//     case removeTaskPack.type:
//       return {
//         ...state,
//         data: state.data.filter(
//           (task) => task.workPackageTitle !== action.payload.workPackageTitle
//         ),
//       };
//     case updateTaskKeyValue.type:
//       return {
//         ...state,
//         data: state.data.map((task) => {
//           if (task.taskId === action.payload.taskId) {
//             const updatedRow = {
//               ...task,
//               [action.payload.key]: action.payload.value,
//             };
//             return updatedRow;
//           }
//           return task;
//         }),
//       };
//     case updateTaskDays.type: // spreads the work
//       const updatedDaysRow = wPUpdateDays(
//         action.payload.task,
//         action.payload.days
//       );
//       return {
//         ...state,
//         data: state.data.map((task) => {
//           if (task.taskId === action.payload.task.taskId) {
//             return updatedDaysRow;
//           }
//           return task;
//         }),
//       };
//     case updateTaskPack.type:
//       const editedRow = updateEditedWp(
//         // map over state in the reducer not this function
//         action.payload.task,
//         action.payload.changes
//         // state.data // don't send this
//       );
//       return {
//         ...state,
//         data: state.data.map((task) => {
//           if (editedRow.taskId === task.taskId) {
//             return editedRow;
//           }
//           return task;
//         }),
//       };
//     case updateTaskBlock.type:
//       const { newValue, oldValue, blockIndex } = action.payload;
//       const updatedBlockRow = wPUpdateBlock(
//         action.payload.task,
//         newValue,
//         oldValue,
//         blockIndex
//       );
//       return {
//         ...state,
//         data: state.data.map((task) => {
//           if (task.taskId === action.payload.task.taskId) {
//             return updatedBlockRow;
//           }
//           return task;
//         }),
//       };
//     case updateTaskPackTitle.type:
//       return {
//         ...state,
//         data: state.data.map((task) => {
//           if (task.workPackageTitle === action.payload.oldTitle) {
//             return {
//               ...task,
//               workPackageTitle: action.payload.newTitle,
//             };
//           }
//           return task;
//         }),
//       };
//     default:
//       return state;
//   }
// }
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
    updateTaskInfo: (tasks, action) => {
      const { taskId, key, value } = action.payload;
      tasks.data[taskId][key] = value;
    },
    updateTaskSchedule: (tasks, action) => {
      // what is this? replace schedule??
      const { taskId, value } = action.payload;
      tasks.data[taskId].schedule = value;
    },
    resizeTaskBar: () => {},
    moveTaskBar: (tasks, action) => {
      console.log("moving");
      const { taskId, originalIndex, newIndex, blockCount } = action.payload;
      const movement = newIndex - originalIndex;
      const bar = tasks.data[taskId].schedule.splice(originalIndex, blockCount);
      tasks.data[taskId].schedule.splice(originalIndex + movement, 0, ...bar);
    },
    updateBlockDays: () => {},

    // pack operations
    renameTaskPack: () => {},
    reorderTasks: (tasks, action) => {
      const { taskId, movement } = action.payload;
      const originalIndex = tasks.data.taskOrder.findIndex(
        (task) => task === taskId
      );
      const newIndex = originalIndex + movement;
      const [movedTask] = tasks.data.splice(originalIndex, 1);
      tasks.data.splice(newIndex, 0, movedTask);
    },
    deleteTaskPack: (tasks, action) => {
      // filter uses an array of allowed values
      // will need to replace 'taskOrder'
      const { tasksToKeep } = action.payload;
      const allTasks = tasks.data;
      const newData = Object.keys(allTasks)
        .filter((key) => tasksToKeep.includes(key))
        .reduce((obj, key) => {
          obj[key] = allTasks[key];
          return obj;
        }, {});
      // add taskOrder back as it will be removed by the filter
      newData.taskOrder = tasksToKeep;
      tasks.data = newData;
    },
  },
});

export const { addTask, moveTaskBar, resizeTaskBar } = slice.actions;
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
