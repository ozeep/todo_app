import API from "../../utils/API";
import { addAlert } from "./alerts";

import {
	ADD_SUBTASK,
	DELETE_SUBTASK,
	ISubtask,
	IThunkAction,
	ITask,
	EDIT_SUBTASK,
} from "../types";

export const deleteSubtask = (_id: string): IThunkAction<string> => (
	dispatch
) => {
	API.delete("subtasks", { params: { _id } })
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
	API.put("subtasks", { taskId, subtask: { name } })
		.then(({ data }) => {
			if (data) dispatch({ type: ADD_SUBTASK, payload: data });
		})
		.catch(() => {
			dispatch(addAlert("Ошибка добавления", "error") as any);
		});
};

export const editSubtask = (subtask: ISubtask): IThunkAction<ISubtask> => (
	dispatch
) => {
	API.patch("subtasks", { subtask })
		.then(() => {
			dispatch({ type: EDIT_SUBTASK, payload: subtask });
		})
		.catch(() => {
			dispatch(addAlert("Ошибка редактирования", "error") as any);
		});
};
