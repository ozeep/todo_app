import React, { useRef, RefObject } from "react";
import Icon from "@material-ui/core/Icon";
import PerfectScrollbar from "react-perfect-scrollbar";

import Gallery from "./gallery/";
import Subtask from "./Subtask";
import Dialog from "./Dialog";
import { ITask } from "../redux/types";
import { useDispatch } from "react-redux";
import { addSubtask } from "../redux/actions/subtasks";
import { deleteTask, editTask } from "../redux/actions/tasks";
import ImageUploader from "./image_uploader";

export interface IFile extends File {
	url?: string;
	id?: string;
	downloadProgress?: number;
}

const Task = ({ name, _id, subtasks, gallery, description }: ITask) => {
	const [fullscreen, setFullscreen] = React.useState(false);

	const [subtaskName, setSubtaskName] = React.useState("");
	const [taskName, setTaskName] = React.useState(name);
	const [descriptionValue, setDescriptionValue] = React.useState(description);

	const [addSubtaskState, setAddSubtaskState] = React.useState(false);
	const [editTaskState, setEditTaskState] = React.useState(false);
	const [editDescription, setEditDescription] = React.useState(false);
	const [showDelete, setShowDelete] = React.useState(false);
	const [showAddSubtask, setShowAddSubtask] = React.useState(false);
	const [menu, setMenu] = React.useState(false);

	const dispatch = useDispatch();

	const handleSubmit = () => {
		dispatch(deleteTask(_id));
		setShowDelete(false);
	};

	const handleSubmitAddSubtask = () => {
		dispatch(addSubtask(_id, subtaskName));
		setSubtaskName("");
		setShowAddSubtask(false);
		setAddSubtaskState(false);
	};

	const handleSubtaskName = (e: any) => {
		setSubtaskName(e.target.value);
	};

	const handleEditDescription = () => {
		dispatch(editTask({ _id, description: descriptionValue }));
		setEditDescription(false);
	};

	const handleEditTaskname = () => {
		dispatch(editTask({ _id, name: taskName }));
		setEditTaskState(false);
	};

	React.useEffect(() => {}, []);

	return (
		<div className={!fullscreen ? `task` : `task fullscreen`}>
			<div className="task__header">
				{!fullscreen && (
					<ul
						onClick={() => setMenu(false)}
						className={`task__menu ${menu && "active"}`}
					>
						<li onClick={() => setShowAddSubtask(true)}>
							<Icon>add</Icon>Добавить подзадачу
						</li>
						<li onClick={() => setEditTaskState(true)}>
							<Icon>create</Icon>Редактировать задачу
						</li>
						<li onClick={() => setShowDelete(true)}>
							<Icon>delete</Icon>Удалить задачу
						</li>
					</ul>
				)}
				{!editTaskState ? (
					<>
						<p className="task__header__title">{name}</p>
						{fullscreen && (
							<Icon
								className="button--icon button--edit"
								onClick={() => setEditTaskState(true)}
							>
								edit
							</Icon>
						)}
					</>
				) : (
					<>
						<input
							type="text"
							value={taskName}
							onChange={(e) => setTaskName(e.target.value)}
						/>
						<Icon
							className="button--icon decline"
							onClick={() => setEditTaskState(false)}
						>
							close
						</Icon>
						<Icon className="button--icon accept" onClick={handleEditTaskname}>
							done
						</Icon>
					</>
				)}
				{!editTaskState && (
					<div className="task__header__buttons">
						<div
							onClick={() => setFullscreen(!fullscreen)}
							className="task__button"
						>
							{!fullscreen ? (
								<Icon className="button--icon button--fullscreen">
									fullscreen
								</Icon>
							) : (
								<Icon className="button--icon button--fullscreen">
									fullscreen_exit
								</Icon>
							)}
						</div>

						<Icon
							onClick={() => setMenu(!menu)}
							className="button--icon button--menu"
						>
							more_horiz
						</Icon>
					</div>
				)}
			</div>

			<div className="task__wrapper">
				<PerfectScrollbar>
					<div className="task__container">
						<div className="task__sidebar">
							<div className="task__sub-title">
								<h2>галерея</h2>
							</div>

							<div className="task__sidebar__add_image">
								<ImageUploader taskId={_id} />
							</div>

							{gallery && gallery.length > 0 && (
								<div className="task__sidebar__gallery">
									<Gallery images={gallery} />
								</div>
							)}
							<div className="task__sub-title">
								<h2>Описание</h2>
								{!editDescription ? (
									<Icon
										className="button--icon"
										onClick={() => setEditDescription(true)}
									>
										mode_edit
									</Icon>
								) : (
									<>
										<Icon
											className="button--icon decline"
											onClick={() => setEditDescription(false)}
										>
											close
										</Icon>
										<Icon
											className="button--icon accept"
											onClick={handleEditDescription}
										>
											done
										</Icon>
									</>
								)}
							</div>
							<div className="task__sidebar__description">
								{editDescription ? (
									<textarea
										name=""
										maxLength={600}
										onChange={(e) => setDescriptionValue(e.target.value)}
										value={descriptionValue}
									></textarea>
								) : (
									<p>{description}</p>
								)}
							</div>
						</div>

						<div className="task__content">
							{fullscreen && (
								<div className="task__sub-title">
									<h2>Подзадачи</h2>
									{!addSubtaskState ? (
										<Icon
											className="button--icon"
											onClick={() => setAddSubtaskState(true)}
										>
											add
										</Icon>
									) : (
										<>
											<Icon
												className="button--icon decline"
												onClick={() => setAddSubtaskState(false)}
											>
												close
											</Icon>
											<Icon
												className="button--icon accept"
												onClick={handleSubmitAddSubtask}
											>
												done
											</Icon>
										</>
									)}
								</div>
							)}
							{addSubtaskState && (
								<input
									type="text"
									className="dark"
									onChange={handleSubtaskName}
									placeholder="Введите название..."
								/>
							)}
							{subtasks &&
								subtasks.map((subtask) => (
									<Subtask {...subtask} key={subtask._id} />
								))}
						</div>
					</div>
				</PerfectScrollbar>
			</div>

			{showDelete && (
				<Dialog
					header="Удаление"
					onSubmit={handleSubmit}
					onDecline={() => setShowDelete(false)}
				>
					<p>Вы действительно хотите удалить эту задачу?"</p>
				</Dialog>
			)}

			{showAddSubtask && (
				<Dialog
					header="Добавление подзадачи"
					onSubmit={handleSubmitAddSubtask}
					onDecline={() => setShowAddSubtask(false)}
				>
					<p>Название:</p>
					<input
						className="dark"
						type="text"
						placeholder="Введите название..."
						onChange={handleSubtaskName}
					/>
				</Dialog>
			)}
		</div>
	);
};

export default Task;
