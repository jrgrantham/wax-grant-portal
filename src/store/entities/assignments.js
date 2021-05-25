import { createSlice } from "@reduxjs/toolkit";

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
    toggleAssignment: (assignments, action) => {
      const { leader, category, workPackageId } = action.payload;
      const index = assignments.data[leader][category].indexOf(workPackageId)
      if (index < 0) {
        assignments.data[leader][category].push(workPackageId);
      } else {
        assignments.data[leader][category].splice(index, 1);
      }
    },
    // delete workPackage - remove from all...
  },
});

export const {
  toggleAssignment,
} = slice.actions;
export default slice.reducer;