import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

import thunk from "redux-thunk";
import { combineReducers } from "redux";

import rootReducer from "./slices/index";

const reducers = combineReducers({
  reducer: rootReducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: [thunk],
});

export default store;
