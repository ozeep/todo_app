import { combineReducers } from "redux";

import groups from "./groups";
import alerts from "./alerts";
import tasks from "./tasks";
import user from "./user";

const reducer = combineReducers({
	groups,
	alerts,
	tasks,
	user,
});

export default reducer;
