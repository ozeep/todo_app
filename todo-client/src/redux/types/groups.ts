export const ADD_GROUP = "ADD_GROUP";
export const DELETE_GROUP = "DELETE_GROUP";
export const EDIT_GROUP = "EDIT_GROUP";
export const FETCH_GROUPS = "FETCH_GROUPS";

export interface Group {
  message: string;
  color: string;
}

interface AddGroupAction {
  type: typeof ADD_GROUP;
  payload: Group;
}

interface DeleteGroupAction {
  type: typeof DELETE_GROUP;
  payload: string;
}

interface FetchGroupsAction {
  type: typeof FETCH_GROUPS;
  payload: Group[];
}

export type GroupActionTypes =
  | FetchGroupsAction
  | AddGroupAction
  | DeleteGroupAction;
