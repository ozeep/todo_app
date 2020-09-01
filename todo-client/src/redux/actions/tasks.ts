import axios from "axios";
import { addAlert } from "./alerts";
import { ADD_TASK, ITask, FETCH_TASKS, IThunkAction } from "../types";

export const addTask = (name: string) => ({
  type: ADD_TASK,
  payload: {
    name,
  },
});

export const deleteTask = (id: string): IThunkAction<ITask[]> => (
  dispatch
) => {};

export const fetchTasks = (groupId: string): IThunkAction<ITask[]> => (
  dispatch
) => {
  axios
    .post("http://localhost:3005/api/tasks", { groupId })
    .then(({ data }) => {
      dispatch({ type: FETCH_TASKS, payload: data });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка загрузки данных", "error") as any);
    });
};
