import { ITask } from ".";

export const ADD_SUBTASK = "ADD_SUBTASK";
export const DELETE_SUBTASK = "DELETE_SUBTASK";
export const EDIT_SUBTASK = "EDIT_SUBTASK";

export interface ISubtask {
  name: string;
  compleated: boolean;
  _id: string;
}

interface AddSubtaskAction {
  type: typeof ADD_SUBTASK;
  payload: ITask;
}

interface DeleteSubtaskAction {
  type: typeof DELETE_SUBTASK;
  payload: string;
}

interface EditSubtasksAction {
  type: typeof EDIT_SUBTASK;
  payload: ITask;
}

export type SubtaskActionTypes =
  | AddSubtaskAction
  | DeleteSubtaskAction
  | EditSubtasksAction;
