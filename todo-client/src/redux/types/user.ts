export const USER_REGISTER = "USER_REGISTER";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_SETERROR = "USER_SETERROR";
export const USER_ISLOGED = "USER_ISLOGED";

export interface IUser {
	name?: string;
	email?: string;
	password?: string;
}

export interface IUserState {
	user?: IUser;
	token?: string;
	error?: string;
	isLoged?: boolean;
}

interface userLoginAction {
	type: typeof USER_LOGIN;
	payload: IUserState;
}

interface userSetErrorAction {
	type: typeof USER_SETERROR;
	payload: IUser;
}

interface userLogoutAction {
	type: typeof USER_LOGOUT;
}

interface userRegisterAction {
	type: typeof USER_REGISTER;
	payload: IUserState;
}

interface userIsLogedAction {
	type: typeof USER_ISLOGED;
	payload: IUserState;
}

export type UserActionTypes =
	| userLoginAction
	| userLogoutAction
	| userRegisterAction
	| userSetErrorAction
	| userIsLogedAction;
