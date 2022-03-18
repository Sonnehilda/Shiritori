import { tickTimeType, addTimeType } from "./types";

const time = 20;

const timerReducer = (state = time, action) => {
  switch (action.type) {
    case tickTimeType:
      if (state > 0) return state - 1;
      else {
        action.resetData();
        return (state = 20);
      }
    case addTimeType:
      if (state + action.payload <= 20) return state + action.payload;
      else return (state = 20);
    default:
      return state;
  }
};

export default timerReducer;
