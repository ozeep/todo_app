import API from "../../utils/API";
import { addAlert } from "./alerts";
import {
	ADD_TASK,
	ITask,
	FETCH_TASKS,
	IThunkAction,
	EDIT_TASK,
	DELETE_TASK,
} from "../types";

export const deleteTask = (_id: string): IThunkAction<string> => (dispatch) => {
	API.delete("tasks", { params: { _id } })
		.then(() => {
			dispatch({ type: DELETE_TASK, payload: _id });
		})
		.catch(() => {
			dispatch(addAlert("Ошибка удаления", "error") as any);
		});
};

export const addTask = (groupId: string, name: string): IThunkAction<ITask> => (
	dispatch
) => {
	API.put("tasks", { groupId, name })
		.then(({ data }) => {
			if (data) dispatch({ type: ADD_TASK, payload: data });
		})
		.catch(() => {
			dispatch(addAlert("Ошибка добавления", "error") as any);
		});
};

export const editTask = (task: ITask): IThunkAction<ITask> => (dispatch) => {
	API.patch("tasks", { task })
		.then(() => {
			dispatch({ type: EDIT_TASK, payload: task });
		})
		.catch(() => {
			dispatch(addAlert("Ошибка редактирования", "error") as any);
		});
};

export const fetchTasks = (groupId: string): IThunkAction<ITask[]> => (
	dispatch
) => {
	API.post("tasks", { groupId })
		.then(({ data }) => {
			dispatch({ type: FETCH_TASKS, payload: data });
		})
		.catch(() => {
			dispatch(addAlert("Ошибка загрузки данных", "error") as any);
		});
};
