import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {
    lead: {
      materials: ["pack1", "pack2"],
      travel: ["pack1"],
      capex: [],
    },
    pOne: {
      materials: [],
      travel: [],
      capex: [],
    },
    pTwo: {
      materials: [],
      travel: [],
      capex: [],
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
      if (!assignments.data[leader][category])
        assignments.data[leader][category] = [];
      const index = assignments.data[leader][category].indexOf(workPackageId);
      if (index < 0) {
        assignments.data[leader][category].push(workPackageId);
      } else {
        assignments.data[leader][category].splice(index, 1);
      }
      // const otherIndex = assignments.data[leader][category].indexOf(workPackageId);
      // assignments.data[leader][otherId] = [workPackageId];
    },
    assignAllToCategory: (assignments, action) => {
      const { leader, category, workPackageIds } = action.payload;
      assignments.data[leader][category] = workPackageIds;
    },
    assignNoneToCategory: (assignments, action) => {
      const { leader, category } = action.payload;
      assignments.data[leader][category] = [];
    },
    deletePackAssignments: (assignments, action) => {
      const { workPackageId } = action.payload;
      console.log(workPackageId);
      const leaders = ["lead", "pOne", "pTwo"];
      const categories = [
        "materials",
        "travel",
        "capex",
        "other1",
        "other2",
        "other3",
        "other4",
        "other5",
      ];
      leaders.forEach((leader) => {
        categories.forEach((category) => {
          const index = assignments.data[leader][category]
            ? assignments.data[leader][category].indexOf(workPackageId)
            : -1;
          if (index > -1) {
            assignments.data[leader][category].splice(index, 1);
          }
        });
      });
    },
    resetAssignments: (assignments, action) => {
      const { leader } = action.payload;
      const categories = [
        "materials",
        "travel",
        "capex",
        "other1",
        "other2",
        "other3",
        "other4",
        "other5",
      ];
      categories.forEach((category) => {
        assignments.data[leader][category] = [];
      });
    },
  },
});

export const {
  toggleAssignment,
  assignAllToCategory,
  assignNoneToCategory,
  deletePackAssignments,
  resetAssignments,
} = slice.actions;
export default slice.reducer;
