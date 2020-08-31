export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const FETCH_TASKS = "FETCH_TASKS";

export interface Task {
  name?: string;
  groupId: string;
  id?: string;
}

interface AddTaskAction {
  type: typeof ADD_TASK;
  payload: Task;
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  payload: string;
}

interface FetchTasksAction {
  type: typeof FETCH_TASKS;
  payload: Task[];
}

export type TaskActionTypes =
  | AddTaskAction
  | DeleteTaskAction
  | FetchTasksAction;
