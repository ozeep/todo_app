import ID from "../../utils/id";
import { Alert, ADD_ALERT, DELETE_ALERT, IThunkAction } from "../types/";

export const addAlert = (
	message: string,
	type: string
): IThunkAction<Alert[]> => (dispatch) => {
	let alertId = ID();

	dispatch({
		type: ADD_ALERT,
		payload: {
			message,
			type,
			alertId,
		},
	});

	setTimeout(() => {
		dispatch(deleteAlert(alertId));
	}, 5000);
};

export const deleteAlert = (alertId: string) => ({
	type: DELETE_ALERT,
	payload: alertId,
});
