// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { allocationData } from "../../data";
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
