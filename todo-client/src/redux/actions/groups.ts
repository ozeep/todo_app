import axios from "axios";
import { addAlert } from "./alerts";
import { IColor } from "../../components/ColorPicker";
import { ADD_GROUP, FETCH_GROUPS, IGroup, IThunkAction } from "../types";

export const addGroup = (name: string, color: IColor) => ({
  type: ADD_GROUP,
  payload: {
    name,
    color,
  },
});

export const fetchGroups = (): IThunkAction<IGroup[]> => (dispatch) => {
  axios
    .get("http://localhost:3005/api/groups")
    .then(({ data }) => {
      dispatch({ type: FETCH_GROUPS, payload: data });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка загрузки данных", "error") as any);
    });
};
