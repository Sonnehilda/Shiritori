import { combineReducers } from "redux";
import timerReducer from "./timer/reducer";
import scoreReducer from "./score/reducer";

const rootReducer = combineReducers({
  timer: timerReducer,
  score: scoreReducer,
});

export default rootReducer;
