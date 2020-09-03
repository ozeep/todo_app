import { addAlert } from "./alerts";
import { IColor } from "../../components/ColorPicker";
import API from "../../utils/API";

import {
  ADD_GROUP,
  FETCH_GROUPS,
  DELETE_GROUP,
  EDIT_GROUP,
  IGroup,
  IThunkAction,
} from "../types";

export const addGroup = (
  name: string,
  color: IColor
): IThunkAction<IGroup[]> => (dispatch) => {
  API.put("groups", { name, color })
    .then(({ data }) => {
      dispatch({ type: ADD_GROUP, payload: data });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка добавления группы", "error") as any);
    });
};

export const fetchGroups = (): IThunkAction<IGroup[]> => (dispatch) => {
  API.post("groups")
    .then(({ data }) => {
      dispatch({ type: FETCH_GROUPS, payload: data });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка загрузки данных", "error") as any);
    });
};

export const deleteGroup = (_id: string): IThunkAction<IGroup[]> => (
  dispatch
) => {
  API.delete("groups", { params: { _id } })
    .then(() => {
      dispatch({ type: DELETE_GROUP, payload: _id });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка удаления группы", "error") as any);
    });
};

export const editGroup = (group: IGroup): IThunkAction<IGroup> => (
  dispatch
) => {
  API.patch("groups", group)
    .then(() => {
      dispatch({ type: EDIT_GROUP, payload: group });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка редактирования группы", "error") as any);
    });
};
