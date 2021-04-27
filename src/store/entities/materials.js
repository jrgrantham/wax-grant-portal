// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "materials",
  initialState: {
    loading: false,
    data: [{ leader: "lead", description: "wood", quantity: 2, cost: 25 }],
    error: "",
  },
  reducers: {
    addMaterial: (materials, action) => {
      // const { newPerson, position } = action.payload;
      // team.data.splice(position, 0, newPerson);
    },
    deleteMaterial: (materials, action) => {
      // const index = team.data.findIndex(
      //   (person) => person.personId === action.payload.personId
      // );
      // team.data.splice(index, 1);
    },
    updateMaterial: (materials, action) => {
    //   const { key, value, personId } = action.payload;
    //   const index = team.data.findIndex(
    //     (person) => person.personId === personId
    //   );
    //   if (key === "name") {
    //     const matches = value.match(/\b(\w)/g) || [];
    //     const acronym = matches.join("").slice(0, 2);
    //     team.data[index].name = value;
    //     team.data[index].acronym = acronym;
    //   } else if (key === "acronym") {
    //     const acronym = value.slice(-2);
    //     team.data[index].acronym = acronym;
    //   } else team.data[index][key] = value;
    },
    reorderMaterials: (materials, action) => {
      // const originalIndex = team.data.findIndex(
      //   (person) => person.personId === action.payload.person.personId
      // );
      // const newIndex = originalIndex + action.payload.movement;
      // const [person] = team.data.splice(originalIndex, 1);
      // team.data.splice(newIndex, 0, person);
    },
  },
});

export const {
  reorderMaterials,
  updateMaterial,
  addMaterial,
  deleteMaterial,
} = slice.actions;
export default slice.reducer;

// export const getTeamIds = createSelector(
//   (state) => state.entities.team,
//   (materials) => {
//     console.log("getTeamIds");
//     const teamIds = [];
//     team.data.forEach((person) => {
//       teamIds.push(person.personId);
//     });
//     return teamIds;
//   }
// );
