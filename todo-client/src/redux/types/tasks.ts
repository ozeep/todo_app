import { ISubtask } from "./subtasks";
import { IGallery } from "./gallery";

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const FETCH_TASKS = "FETCH_TASKS";

export interface ITask {
	name?: string;
	groupId?: string;
	_id: string;
	description?: string;
	subtasks?: ISubtask[];
	gallery?: IGallery[];
}

interface AddTaskAction {
	type: typeof ADD_TASK;
	payload: ITask;
}

interface DeleteTaskAction {
	type: typeof DELETE_TASK;
	payload: string;
}

interface FetchTasksAction {
	type: typeof FETCH_TASKS;
	payload: ITask[];
}

interface EditTaskAction {
	type: typeof EDIT_TASK;
	payload: ITask;
}

export type TaskActionTypes =
	| AddTaskAction
	| DeleteTaskAction
	| FetchTasksAction
	| EditTaskAction;
