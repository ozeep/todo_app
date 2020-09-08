import React from "react";
import { useDispatch } from "react-redux";

import { useLocation, Switch, Route, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import TasksContainer from "../components/TasksContainer";
import { Icon } from "@material-ui/core";
import { addTask } from "../redux/actions/tasks";
import Dialog from "../components/Dialog";
import Sidebar from "../components/Sidebar";
import AlertContainer from "../components/AlertContainer";
import { userLogout } from "../redux/actions/user";

const HomePage = () => {
	const [showAddTask, setShowAddTask] = React.useState(false);
	const [taskName, setTaskName] = React.useState<string>("");

	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const history = useHistory();

	const pathLink = pathname.includes("/tasks/")
		? pathname.replace("/tasks/", "")
		: "";

	const handleSubmitAddTask = () => {
		dispatch(addTask(pathLink, taskName));
		setTaskName("");
		setShowAddTask(false);
	};

	const handleLogoutClick = () => {
		dispatch(userLogout());
		history.push(`/`);
	};

	return (
		<>
			<div className="wrapper">
				<div className="header">
					<div className="logo">
						<h1>DOOZEE</h1>
					</div>
					<button className="button header__logout" onClick={handleLogoutClick}>
						Logout
					</button>
				</div>
				<div className="container">
					<Sidebar />
					<div className="content">
						<div className="content__header">
							<button
								onClick={() => setShowAddTask(true)}
								className="button reversed"
							>
								<Icon>add</Icon>
								<p>Добавить задачу</p>
							</button>
						</div>
						<PerfectScrollbar>
							<div className="content__tasks">
								<Switch>
									<Route path={`/tasks/:groupId`}>
										<TasksContainer />
									</Route>
								</Switch>
							</div>
						</PerfectScrollbar>
					</div>
				</div>
			</div>
			{showAddTask && (
				<Dialog
					header="Добавление задачи"
					onSubmit={handleSubmitAddTask}
					onDecline={() => setShowAddTask(false)}
				>
					<p>Название:</p>
					<input
						type="text"
						className="dark"
						placeholder="Введите название"
						onChange={(e) => setTaskName(e.target.value)}
					/>
				</Dialog>
			)}
			<AlertContainer />
		</>
	);
};

export default HomePage;
