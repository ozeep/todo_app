import { AlertActionTypes, ADD_ALERT, DELETE_ALERT, Alert } from "../types/";

const initialState: Alert[] = [];

const alerts = (state = initialState, action: AlertActionTypes) => {
  switch (action.type) {
    case ADD_ALERT:
      return [...state, action.payload];
    case DELETE_ALERT:
      return state.filter((item) => item.alertId !== action.payload);
    default:
      return state;
  }
};

export default alerts;
