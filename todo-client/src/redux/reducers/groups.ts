import { ADD_GROUP, FETCH_GROUPS, Group, GroupActionTypes } from "../types";

const initialState: Group[] = [];

const groups = (state = initialState, action: GroupActionTypes) => {
  switch (action.type) {
    case ADD_GROUP:
      return [...state, action.payload];
    case FETCH_GROUPS:
      return action.payload;
    default:
      return state;
  }
};

export default groups;
