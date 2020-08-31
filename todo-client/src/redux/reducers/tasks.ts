import { Task, ADD_TASK, FETCH_TASKS, TaskActionTypes } from "../types";

const initialState: Task[] = [
  {
    groupId: "1",
  },
];

const tasks = (state = initialState, action: TaskActionTypes) => {
  switch (action.type) {
    case ADD_TASK:
      return [...state, action.payload];
    case FETCH_TASKS:
      return action.payload;
    default:
      return state;
  }
};

export default tasks;
