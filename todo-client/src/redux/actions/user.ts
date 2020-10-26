import API from "../../utils/API";
import { addAlert } from "./alerts";
import {
	USER_LOGIN,
	IThunkAction,
	USER_LOGOUT,
	IUser,
	USER_SETERROR,
	IAsyncThunkAction,
} from "../types";

export const userLogin = (user: IUser): IAsyncThunkAction<IUser> => (
	dispatch
) => {
	return API.post("user/login", { user })
		.then(({ data }: any) => {
			const { user, token, error } = data;

			if (error) return dispatch({ type: USER_SETERROR, payload: error });
			else dispatch({ type: USER_LOGIN, payload: { user, isLoged: true } });
			localStorage.setItem("token", token);
		})
		.catch(() => {
			dispatch(addAlert("Ошибка авторизации", "error") as any);
		});
};

export const isUserLoged = (): IAsyncThunkAction<IUser> => (dispatch) => {
	let token = localStorage.getItem("token");

	if (!token) dispatch({ type: USER_LOGOUT, payload: { isLoged: false } });

	return API.post("user/isloged", { token })
		.then(({ data }: any) => {
			dispatch({ type: USER_LOGIN, payload: data });
		})
		.catch(() => {
			dispatch(addAlert("Сервер недоступен", "error") as any);
		});
};

export const userLogout = (): IThunkAction<string> => (dispatch) => {
	dispatch({ type: USER_LOGOUT });
	localStorage.removeItem("token");
};

export const userRegister = (user: IUser): IAsyncThunkAction<IUser> => (
	dispatch
) => {
	return API.post("user/register", { user })
		.then(({ data }: any) => {
			const { user, token, error } = data;
			if (error) return dispatch({ type: USER_SETERROR, payload: error });
			else dispatch({ type: USER_LOGIN, payload: { user, isLoged: true } });
			localStorage.setItem("token", token);
		})
		.catch(({ error }: any) => {
			if (error) dispatch({ type: USER_SETERROR, payload: error });
			else dispatch(addAlert("Ошибка регистрации", "error") as any);
		});
};
