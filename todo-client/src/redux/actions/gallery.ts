import API from "../../utils/API";
import { addAlert } from "./alerts";

import {
  ADD_IMAGE,
  DELETE_IMAGE,
  IThunkAction,
  ITask,
  IGallery,
} from "../types";
import { IFile } from "../../components/Task";
import debounce from "@material-ui/core/utils/debounce";

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
  callback: (progress: number) => void
): IThunkAction<ITask> => (dispatch) => {
  let data = new FormData();
  data.append("image", image);
  data.append("taskId", taskId);

  API.put("gallery", data, {
    onUploadProgress: (progressEvent) => {
      var percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      callback(percentCompleted);
    },
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then(({ data }) => {
      if (data) dispatch({ type: ADD_IMAGE, payload: data });
    })
    .catch(() => {
      dispatch(addAlert("Ошибка добавления", "error") as any);
    });
};
