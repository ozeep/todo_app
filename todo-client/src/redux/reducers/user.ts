import {
	UserActionTypes,
	IUserState,
	USER_LOGIN,
	USER_LOGOUT,
	USER_SETERROR,
	USER_ISLOGED,
} from "../types";

const initialState: IUserState = {};

const user = (state = initialState, action: UserActionTypes) => {
	switch (action.type) {
		case USER_LOGIN:
			return {
				...state,
				user: action.payload.user,
				isLoged: action.payload.isLoged,
			};
		case USER_LOGOUT:
			return { isLoged: false };
		case USER_SETERROR:
			return { ...state, error: action.payload };
		case USER_ISLOGED:
			return action.payload;
		default:
			return state;
	}
};

export default user;
