import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./entities/tasks";
import deadlinesReducer from "./entities/deadlines";
import projectReducer from "./entities/project";
import teamReducer from "./entities/team";
import userReducer from "./user";
import allocationsReducer from "./entities/allocations";
import optionsReducer from "./entities/options";

const entities = combineReducers({
  tasks: taskReducer,
  deadlines: deadlinesReducer,
  project: projectReducer,
  team: teamReducer,
  allocations: allocationsReducer,
  options: optionsReducer
})

const rootReducer = combineReducers({
  user: userReducer,
  entities
});

export const store = configureStore({ reducer: rootReducer });