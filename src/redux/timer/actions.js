import { tickTimeType, addTimeType } from "./types";

export const tickTime = () => {
  return { type: tickTimeType };
};

export const addTime = (num) => {
  return { type: addTimeType, payload: num };
};
