import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

import { Gallery, Subtask, Dialog, ImageUploader } from "./";

import { ITask } from "../redux/types";
import { useDispatch } from "react-redux";
import { addSubtask } from "../redux/actions/subtasks";
import { deleteTask, editTask } from "../redux/actions/tasks";

import {
	AiOutlineDelete,
	AiOutlinePlus,
	AiOutlineEdit,
	AiOutlineClose,
	AiOutlineCheck,
	AiOutlineFullscreen,
	AiOutlineFullscreenExit,
	AiOutlineMore,
} from "react-icons/ai";

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
		if (!subtaskName) return;
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
							<AiOutlineEdit />
							Добавить подзадачу
						</li>
						<li onClick={() => setEditTaskState(true)}>
							<AiOutlinePlus />
							Редактировать задачу
						</li>
						<li onClick={() => setShowDelete(true)}>
							<AiOutlineDelete />
							Удалить задачу
						</li>
					</ul>
				)}
				{!editTaskState ? (
					<>
						<p className="task__header__title">{name}</p>
						{fullscreen && (
							<AiOutlineEdit
								className="button--icon button--edit"
								onClick={() => setEditTaskState(true)}
							/>
						)}
					</>
				) : (
					<>
						<input
							type="text"
							value={taskName}
							onChange={(e) => setTaskName(e.target.value)}
						/>
						<AiOutlineClose
							className="button--icon decline"
							onClick={() => setEditTaskState(false)}
						/>
						<AiOutlineCheck
							className="button--icon accept"
							onClick={handleEditTaskname}
						/>
					</>
				)}
				{!editTaskState && (
					<div className="task__header__buttons">
						<div
							onClick={() => setFullscreen(!fullscreen)}
							className="task__button"
						>
							{!fullscreen ? (
								<AiOutlineFullscreen className="button--icon button--fullscreen" />
							) : (
								<AiOutlineFullscreenExit className="button--icon button--fullscreen" />
							)}
						</div>

						{!fullscreen && (
							<AiOutlineMore
								onClick={() => setMenu(!menu)}
								className="button--icon button--menu"
							/>
						)}
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
									<AiOutlineEdit
										className="button--icon dark"
										onClick={() => setEditDescription(true)}
									/>
								) : (
									<>
										<AiOutlineClose
											className="button--icon decline"
											onClick={() => setEditDescription(false)}
										/>
										<AiOutlineCheck
											className="button--icon accept"
											onClick={handleEditDescription}
										/>
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
										<AiOutlinePlus
											className="button--icon dark"
											onClick={() => setAddSubtaskState(true)}
										/>
									) : (
										<>
											<AiOutlineClose
												className="button--icon decline"
												onClick={() => setAddSubtaskState(false)}
											/>
											<AiOutlineCheck
												className="button--icon accept"
												onClick={handleSubmitAddSubtask}
											/>
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
