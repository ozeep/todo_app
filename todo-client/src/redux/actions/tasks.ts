import axios from "axios";
import { addAlert } from "./alerts";
import { ADD_TASK, Task, FETCH_TASKS, IThunkAction } from "../types";
import { Action } from "redux";

export const addTask = (name: string) => ({
  type: ADD_TASK,
  payload: {
    name,
  },
});

export const deleteTask = (id: string): IThunkAction<Task[]> => (
  dispatch
) => {};

export const fetchTasks = (groupId: string): IThunkAction<Task[]> => (
  dispatch
) => {
  axios
    .get(`http://localhost:3004/tasks?groupid_like=${groupId}`)
    .then(({ data }) => {
      dispatch({ type: FETCH_TASKS, payload: data });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка загрузки данных", "error") as any);
    });
};
