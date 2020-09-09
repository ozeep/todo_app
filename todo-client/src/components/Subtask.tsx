import React from "react";
import classNames from "classnames";
import { Dialog } from "./";
import { ISubtask } from "../redux/types";
import { useDispatch } from "react-redux";
import { deleteSubtask, editSubtask } from "../redux/actions/subtasks";
import { AiOutlineDelete } from "react-icons/ai";

interface Subtask extends ISubtask {
	onDelete?(): void;
}

const Subtask = ({ name, compleated, _id }: Subtask) => {
	const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

	const dispatch = useDispatch();

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

			<p className="task__sub_task__name">{name}</p>
			<AiOutlineDelete
				onClick={() => deleteTask()}
				className="button--icon dark"
			/>
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
