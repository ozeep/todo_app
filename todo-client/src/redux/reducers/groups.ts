import {
  ADD_GROUP,
  FETCH_GROUPS,
  IGroup,
  GroupActionTypes,
  DELETE_GROUP,
  EDIT_GROUP,
} from "../types";

const initialState: IGroup[] = [];

const groups = (state = initialState, action: GroupActionTypes) => {
  switch (action.type) {
    case ADD_GROUP:
      return [action.payload, ...state];
    case DELETE_GROUP:
      return state.filter((group) => group._id !== action.payload);
    case FETCH_GROUPS:
      return action.payload;
    case EDIT_GROUP:
      return state.map((group) =>
        group._id === action.payload._id
          ? { ...group, ...action.payload }
          : group
      );
    default:
      return state;
  }
};

export default groups;
