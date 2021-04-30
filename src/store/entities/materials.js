// import axios from "axios";
import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

const slice = createSlice({
  name: "materials",
  initialState: {
    loading: false,
    data: [
      {
        leader: "lead",
        description: "wood",
        quantity: 2,
        cost: 25,
        materialId: "1234",
      },
    ],
    error: "",
  },
  reducers: {
    addMaterial: (materials, action) => {
      const { newMaterial, position } = action.payload;
      materials.data.splice(position, 0, newMaterial);
    },
    deleteMaterial: (materials, action) => {
      const index = materials.data.findIndex(
        (material) => material.materialId === action.payload.materialId
      );
      materials.data.splice(index, 1);
    },
    updateMaterial: (materials, action) => {
      const { key, value, materialId } = action.payload;
      const index = materials.data.findIndex(
        (person) => person.materialId === materialId
      );
      materials.data[index][key] = value;
    },
    reorderMaterials: (materials, action) => {
      const originalIndex = materials.data.findIndex(
        (material) => material.materialId === action.payload.material.materialId
      );
      const newIndex = originalIndex + action.payload.movement;
      const [material] = materials.data.splice(originalIndex, 1);
      materials.data.splice(newIndex, 0, material);
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

export const getMaterialsCost = createSelector(
  (state) => state.entities.materials,
  (materials) => {
    console.log("getMaterialsCost");
    const costs = {
      lead: 0,
      pOne: 0,
      pTwo: 0,
      combined: 0,
      category: "Materials"
    };
    materials.data.forEach((material) => {
      const materialCost = material.cost * material.quantity;
      costs[material.leader] = costs[material.leader] + materialCost;
      costs.combined = costs.combined + materialCost
    });
    return costs;
  }
);
