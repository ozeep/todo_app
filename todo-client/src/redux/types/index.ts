import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

export * from "./alerts";
export * from "./groups";
export * from "./tasks";
export * from "./subtasks";
export * from "./gallery";
export * from "./user";

export type IThunkAction<T> = ThunkAction<void, T, unknown, Action<string>>;
export type IAsyncThunkAction<T> = ThunkAction<
	Promise<any>,
	T,
	unknown,
	Action<string>
>;

export type ReduxDispatch = ThunkDispatch<any, any, Action>;
