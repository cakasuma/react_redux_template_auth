import { combineReducers } from "redux";
import { userReducer } from "./user-reducer";
import { dummyReducer } from "./dummy-reducer";

const rootReducers = combineReducers({
  userReducer,
  dummyReducer,
});

export default rootReducers;
