import { ADD_GROUP, FETCH_GROUPS, IGroup, GroupActionTypes } from "../types";

const initialState: IGroup[] = [];

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
