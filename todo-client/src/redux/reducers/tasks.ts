import {
  ITask,
  ADD_TASK,
  FETCH_TASKS,
  TaskActionTypes,
  SubtaskActionTypes,
  ADD_SUBTASK,
  EDIT_SUBTASK,
  DELETE_SUBTASK,
  EDIT_TASK,
  DELETE_TASK,
} from "../types";

const initialState: ITask[] = [];

const tasks = (
  state = initialState,
  action: TaskActionTypes | SubtaskActionTypes
) => {
  switch (action.type) {
    case ADD_SUBTASK:
      return [
        ...state.filter((item) => item._id !== action.payload._id),
        action.payload,
      ];
    case EDIT_SUBTASK:
      return [
        ...state.map((item) => {
          return {
            ...item,
            subtasks: item.subtasks.map((sub) =>
              sub._id === action.payload._id ? (sub = action.payload) : sub
            ),
          };
        }),
      ];
    case DELETE_SUBTASK:
      return [
        ...state.map((item) => {
          return {
            ...item,
            subtasks: item.subtasks.filter((sub) => sub._id !== action.payload),
          };
        }),
      ];
    case ADD_TASK:
      return [...state, action.payload];
    case DELETE_TASK:
      return state.filter((task) => task._id !== action.payload);
    case FETCH_TASKS:
      return action.payload;
    case EDIT_TASK:
      return state.map((task) =>
        task._id === action.payload._id ? { ...task, ...action.payload } : task
      );
    default:
      return state;
  }
};

export default tasks;
