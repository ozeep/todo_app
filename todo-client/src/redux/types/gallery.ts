import { ITask } from ".";

export const ADD_IMAGE = "ADD_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";

export interface IGallery {
  name: string;
  url: string;
  _id: string;
}

interface AddImageAction {
  type: typeof ADD_IMAGE;
  payload: ITask;
}

interface DeleteImageAction {
  type: typeof DELETE_IMAGE;
  payload: string;
}

export type ImageActionTypes = AddImageAction | DeleteImageAction;
