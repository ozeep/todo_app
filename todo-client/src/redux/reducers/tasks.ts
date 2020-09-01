import {
  ITask,
  ADD_TASK,
  FETCH_TASKS,
  TaskActionTypes,
  SubtaskActionTypes,
  ADD_SUBTASK,
  EDIT_SUBTASK,
  DELETE_SUBTASK,
} from "../types";

const initialState: ITask[] = [
  {
    groupId: "1",
    subtasks: [],
  },
];

const tasks = (
  state = initialState,
  action: TaskActionTypes | SubtaskActionTypes
) => {
  switch (action.type) {
    case ADD_SUBTASK:
      return [...state, action.payload];
    case EDIT_SUBTASK:
      return action.payload;
    case DELETE_SUBTASK:
      return action.payload;
    case ADD_TASK:
      return [...state, action.payload];
    case FETCH_TASKS:
      return action.payload;
    default:
      return state;
  }
};

export default tasks;
