import axios from "axios";
import { addAlert } from "./alerts";
import { ADD_SUBTASK, DELETE_SUBTASK, ISubtask, IThunkAction } from "../types";

export const deleteSubtask = (_id: string): IThunkAction<ISubtask> => (
  dispatch
) => {
  axios
    .delete("http://localhost:3005/api/tasks", { data: { _id } })
    .then(({ data }) => {
      if (data.subtask)
        dispatch({ type: DELETE_SUBTASK, payload: data.subtask });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка добавления", "error") as any);
    });
};

export const addSubtask = (
  taskId: string,
  name: string
): IThunkAction<ISubtask> => (dispatch) => {
  axios
    .put("http://localhost:3005/api/tasks", { taskId, subtask: { name } })
    .then(({ data }) => {
      if (data.subtask) dispatch({ type: ADD_SUBTASK, payload: data.subtask });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка добавления", "error") as any);
    });
};
