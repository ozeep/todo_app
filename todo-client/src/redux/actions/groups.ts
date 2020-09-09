import { addAlert } from "./alerts";
import API from "../../utils/API";

import {
	ADD_GROUP,
	FETCH_GROUPS,
	DELETE_GROUP,
	EDIT_GROUP,
	IGroup,
	IThunkAction,
	IAsyncThunkAction,
} from "../types";

export const addGroup = (group: IGroup): IThunkAction<IGroup[]> => (
	dispatch
) => {
	API.put("groups", group)
		.then(({ data }) => {
			dispatch({ type: ADD_GROUP, payload: data });
		})
		.catch(() => {
			dispatch(addAlert("Ошибка добавления группы", "error") as any);
		});
};

export const fetchGroups = (userId: string): IAsyncThunkAction<IGroup[]> => (
	dispatch
) => {
	return API.post("groups", { userId })
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
