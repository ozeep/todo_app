import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/actions/tasks";
import Task from "./Task";
import { ITask, ReduxDispatch } from "../redux/types";
import Spinner from "./loader/Spinner";
import { RootState } from "../redux/reducers";

const TasksContainer = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const { groupId }: any = useParams();

	const dispatch = useDispatch<ReduxDispatch>();
	const tasks = useSelector((state: RootState) => state.tasks);

	React.useEffect(() => {
		let isSubscribed = true;

		setIsLoading(true);
		dispatch(fetchTasks(groupId)).then(
			() => isSubscribed && setIsLoading(false)
		);

		return () => {
			isSubscribed = false;
		};
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

export default TasksContainer;
