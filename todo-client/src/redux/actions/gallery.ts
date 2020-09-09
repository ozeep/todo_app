import API from "../../utils/API";
import { addAlert } from "./alerts";

import { DELETE_IMAGE, IThunkAction, ITask, EDIT_TASK } from "../types";
import { IFile } from "../../components/";

export const deleteImage = (_id: string): IThunkAction<string> => (
	dispatch
) => {
	API.delete("subtasks", { params: { _id } })
		.then(() => {
			dispatch({ type: DELETE_IMAGE, payload: _id });
		})
		.catch(() => {
			dispatch(addAlert("Ошибка удаления", "error") as any);
		});
};

export const addImage = (
	taskId: string,
	image: IFile,
	callback: (progressEvent: ProgressEvent<EventTarget>) => void
): IThunkAction<ITask> => (dispatch) => {
	let data = new FormData();
	data.append("image", image);
	data.append("taskId", taskId);

	API.put("gallery", data, {
		onUploadProgress: callback,
		headers: { "Content-Type": "multipart/form-data" },
	})
		.then(({ data }) => {
			if (data) dispatch({ type: EDIT_TASK, payload: data });
		})
		.catch(() => {
			dispatch(addAlert("Ошибка добавления", "error") as any);
		});
};
