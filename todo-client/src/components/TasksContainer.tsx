import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { fetchTasks } from "../redux/actions/tasks";
import Task from "./Task";
import { ITask, ReduxDispatch } from "../redux/types";
import Spinner from "./loader/Spinner";

interface ITaskContainer {
	tasks: ITask[];
}

const TasksContainer = ({ tasks }: ITaskContainer) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const { groupId }: any = useParams();
	const dispatch = useDispatch<ReduxDispatch>();

	React.useEffect(() => {
		setIsLoading(true);
		dispatch(fetchTasks(groupId)).then(() => setIsLoading(false));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [groupId]);

	return (
		<>
			{isLoading ? (
				<Spinner />
			) : (
				tasks.map((task: ITask) => <Task {...task} key={task._id} />)
			)}
		</>
	);
};

export default connect(({ tasks }: ITaskContainer) => ({
	tasks,
}))(TasksContainer);
