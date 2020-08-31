import { ThunkAction } from "redux-thunk";
import { Action } from "redux";

export * from "./alerts";
export * from "./groups";
export * from "./tasks";

export type IThunkAction<T> = ThunkAction<void, T, unknown, Action<string>>;
