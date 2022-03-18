import { setScoreType, addScoreType } from "./types";

export const setScore = (num) => {
  return { type: setScoreType, payload: num };
};

export const addScore = (num) => {
  return { type: addScoreType, payload: num };
};
