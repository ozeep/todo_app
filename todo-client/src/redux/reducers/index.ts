import { combineReducers } from "redux";

import groups from "./groups";
import alerts from "./alerts";
import tasks from "./tasks";
import user from "./user";

const reducer = combineReducers({
	groups,
	alerts,
	user,
	tasks,
});

export default reducer;

export type RootState = ReturnType<typeof reducer>;
