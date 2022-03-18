import { setScoreType, addScoreType } from "./types";

const score = 0;

const scoreReducer = (state = score, action) => {
  switch (action.type) {
    case setScoreType:
      state = action.payload;
      return state;
    case addScoreType:
      localStorage.setItem("score", state + action.payload);
      return state + action.payload;
    default:
      return state;
  }
};

export default scoreReducer;
