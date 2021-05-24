import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { getTotalsByLeader } from "../../helpers";
import { store } from "../../store";

const initialState = {
  loading: false,
  data: {
    lead: {
      materials: ["pack1", "pack2"],
      travel: ["pack1"],
      capex: [],
      other1: [],
      other2: [],
      other3: [],
      other4: [],
      other5: [],
    },
    pOne: {
      materials: [],
      travel: [],
      capex: [],
      other1: [],
      other2: [],
      other3: [],
      other4: [],
      other5: [],
    },
    pTwo: {
      materials: [],
      travel: [],
      capex: [],
      other1: [],
      other2: [],
      other3: [],
      other4: [],
      other5: [],
    },
  },
  error: null,
};

const slice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (assignments, action) => {
      const { leader, category, workPackageId } = action.payload;
      assignments.data[leader][category].push(workPackageId);
    },
    deleteAssignment: (assignments, action) => {
      const { workPackageId } = action.payload;
      const index = assignments.data.findIndex(
        (assignment) => assignment === workPackageId
      );
      assignments.data.splice(index, 1);
    },
    // delete workPackage - remove from all...
  },
});

export const {
  addAssignment,
  updateAllocation,
  deleteAssignment,
  deleteTaskassignments,
  deletePersonassignments,
} = slice.actions;
export default slice.reducer;