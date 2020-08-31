export const ADD_ALERT = "ADD_ALERT";
export const DELETE_ALERT = "DELETE_ALERT";

export interface Alert {
  message: string;
  type: string;
  alertId: string;
}

export interface AlertsState {
  alerts: Alert[];
}

interface AddAlertAction {
  type: typeof ADD_ALERT;
  payload: Alert;
}

interface DeleteAlertAction {
  type: typeof DELETE_ALERT;
  payload: string;
}

export type AlertActionTypes = AddAlertAction | DeleteAlertAction;
