import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./entities/tasks";
import deadlinesReducer from "./entities/deadlines";
import projectReducer from "./entities/project";
import teamReducer from "./entities/team";
import userReducer from "./user";
import allocationsReducer from "./entities/allocations";
import optionsReducer from "./entities/options";
import materialsReducer from "./entities/materials";
import travelReducer from "./entities/travel";
import capexReducer from "./entities/capex";
import otherReducer from "./entities/other";
import assignmentsReducer from "./entities/assignments";
import revenueReducer from './entities/revenue'

const entities = combineReducers({
  tasks: taskReducer,
  deadlines: deadlinesReducer,
  project: projectReducer,
  team: teamReducer,
  allocations: allocationsReducer,
  options: optionsReducer,
  materials: materialsReducer,
  travel: travelReducer,
  capex: capexReducer,
  other: otherReducer,
  assignments: assignmentsReducer,
  revenue: revenueReducer,
})

const rootReducer = combineReducers({
  user: userReducer,
  entities
});

export const store = configureStore({ reducer: rootReducer });