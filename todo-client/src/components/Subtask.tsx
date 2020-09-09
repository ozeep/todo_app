import React, { ChangeEvent } from "react";
import classNames from "classnames";
import { Dialog } from "./";
import { ISubtask } from "../redux/types";
import { useDispatch } from "react-redux";
import { deleteSubtask, editSubtask } from "../redux/actions/subtasks";
import {
	AiOutlineDelete,
	AiOutlineEdit,
	AiOutlineClose,
	AiOutlineCheck,
} from "react-icons/ai";

interface Subtask extends ISubtask {
	onDelete?(): void;
}

const Subtask = ({ name, compleated, _id }: Subtask) => {
	const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
	const [editName, setEditName] = React.useState(false);
	const [nameValue, setNameValue] = React.useState(name);

	const dispatch = useDispatch();

	const handleSubtaskName = (e: ChangeEvent<HTMLInputElement>) => {
		setNameValue(e.target.value);
	};

	const handleSubmitEditName = () => {
		if (!nameValue) return;
		dispatch(editSubtask({ _id, compleated, name: nameValue }));
		setEditName(false);
	};

	const deleteTask = () => {
		setShowDeleteDialog(true);
	};

	const handleSubmit = () => {
		dispatch(deleteSubtask(_id));
		setShowDeleteDialog(false);
	};

	const handleDecline = () => {
		setShowDeleteDialog(false);
	};

	const handleCheck = (e: any) => {
		dispatch(editSubtask({ _id, name, compleated: e.target.checked }));
	};

	return (
		<div className={classNames("task__sub_task", { compleated })}>
			<div className="checkbox">
				<input
					type="checkbox"
					name="checkbox"
					checked={compleated}
					onChange={handleCheck}
				/>
				<label htmlFor="checkbox"></label>
			</div>

			{!editName ? (
				<>
					<p className="task__sub_task__name">{name}</p>
					<AiOutlineEdit
						onClick={() => setEditName(true)}
						className="button--icon dark"
					/>
					<AiOutlineDelete
						onClick={() => deleteTask()}
						className="button--icon dark"
					/>
				</>
			) : (
				<>
					<input
						className="dark"
						type="text"
						value={nameValue}
						placeholder="Введите название..."
						onChange={handleSubtaskName}
					/>
					<AiOutlineClose
						className="button--icon decline"
						onClick={() => setEditName(false)}
					/>
					<AiOutlineCheck
						className="button--icon accept"
						onClick={handleSubmitEditName}
					/>
				</>
			)}

			{showDeleteDialog && (
				<Dialog
					header="Удаление"
					onSubmit={handleSubmit}
					onDecline={handleDecline}
				>
					<p>Вы действительно хотите удалить эту позадачу?</p>
				</Dialog>
			)}
		</div>
	);
};

export default Subtask;
