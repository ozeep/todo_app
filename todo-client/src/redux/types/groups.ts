import { IColor } from "../../components/ColorPicker";

export const ADD_GROUP = "ADD_GROUP";
export const DELETE_GROUP = "DELETE_GROUP";
export const EDIT_GROUP = "EDIT_GROUP";
export const FETCH_GROUPS = "FETCH_GROUPS";

export interface IGroup {
  _id: string;
  name: string;
  color: IColor;
}

interface AddGroupAction {
  type: typeof ADD_GROUP;
  payload: IGroup;
}

interface DeleteGroupAction {
  type: typeof DELETE_GROUP;
  payload: string;
}

interface FetchGroupsAction {
  type: typeof FETCH_GROUPS;
  payload: IGroup[];
}

export type GroupActionTypes =
  | FetchGroupsAction
  | AddGroupAction
  | DeleteGroupAction;
