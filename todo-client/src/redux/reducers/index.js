import { combineReducers } from "redux";

import groups from "./groups";
import alerts from "./alerts";
import tasks from "./tasks";

const reducer = combineReducers({
  groups,
  alerts,
  tasks,
});

export default reducer;
