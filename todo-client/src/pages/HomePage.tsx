import React from "react";
import { useDispatch } from "react-redux";

import { useLocation, Switch, Route, useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { addTask } from "../redux/actions/tasks";
import { userLogout } from "../redux/actions/user";

import { Dialog, Sidebar, TasksContainer } from "../components";

import { AiOutlinePlus, AiOutlineLogout } from "react-icons/ai";

const HomePage = () => {
	const [showAddTask, setShowAddTask] = React.useState(false);
	const [taskName, setTaskName] = React.useState<string>("");

	const dispatch = useDispatch();
	const { pathname } = useLocation();
	const history = useHistory();

	const taskLink = pathname.includes("/tasks/")
		? pathname.replace("/tasks/", "")
		: "";

	const home = pathname === "/home/";

	const handleSubmitAddTask = () => {
		if (!taskName) return;
		dispatch(addTask(taskLink, taskName));
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
						<AiOutlineLogout />
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
								<AiOutlinePlus />
								<p>Добавить задачу</p>
							</button>
						</div>
						{!home ? (
							<PerfectScrollbar>
								<div className="content__tasks">
									<Switch>
										<Route path={`/tasks/:groupId`}>
											<TasksContainer />
										</Route>
									</Switch>
								</div>
							</PerfectScrollbar>
						) : (
							<div className="home-wrapper">
								<h1 className="home__header">
									Добро пожаловать на <span>DOOZEE</span>
								</h1>
								<div className="home__content">
									<p>Для начала работы с DOOZEE создайте свой первый проект</p>
									<p>
										Нажмите на кнопку "Добавить проект" для создания проекта
									</p>
								</div>
							</div>
						)}
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
		</>
	);
};

export default HomePage;
