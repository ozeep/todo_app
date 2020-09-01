import axios from "axios";
import { addAlert } from "./alerts";
import {
  ADD_SUBTASK,
  DELETE_SUBTASK,
  ISubtask,
  IThunkAction,
  ITask,
} from "../types";

export const deleteSubtask = (_id: string): IThunkAction<string> => (
  dispatch
) => {
  axios
    .delete("http://localhost:3005/api/subtasks", { params: { _id } })
    .then(() => {
      dispatch({ type: DELETE_SUBTASK, payload: _id });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка удаления", "error") as any);
    });
};

export const addSubtask = (
  taskId: string,
  name: string
): IThunkAction<ITask> => (dispatch) => {
  axios
    .put("http://localhost:3005/api/subtasks", { taskId, subtask: { name } })
    .then(({ data }) => {
      if (data) dispatch({ type: ADD_SUBTASK, payload: data });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка добавления", "error") as any);
    });
};
