import React from "react";
import ColorPicker from "./ColorPicker";
import { Link, useRouteMatch } from "react-router-dom";
import classNames from "classnames";
import { IGroup } from "../redux/types";
import Dialog from "./Dialog";
import { useDispatch } from "react-redux";
import { deleteGroup, editGroup } from "../redux/actions/groups";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { IColor } from ".";

const Group = ({ name, _id, color }: IGroup) => {
	const [colorState, setColorState] = React.useState(color!);
	const [edit, setEdit] = React.useState(false);
	const [showDelete, setShowDelete] = React.useState(false);

	const [groupName, setGroupName] = React.useState(name);

	const match = useRouteMatch(`/tasks/${_id}`);

	const dispatch = useDispatch();

	const onColorChange = ({ hue, saturation, light }: IColor) => {
		setColorState((prevState) => ({
			...prevState,
			hue,
			saturation,
			light,
		}));
	};

	const editAccept = () => {
		dispatch(editGroup({ name: groupName, _id, color: colorState }));
		setEdit(false);
	};

	const handleSubmit = () => {
		dispatch(deleteGroup(_id!));
		setShowDelete(false);
	};

	return (
		<div
			className={classNames("group_block", { active: match, edit })}
			style={{
				backgroundColor: `hsl(${colorState.hue}, ${colorState.saturation}%, ${colorState.light}%)`,
			}}
		>
			{edit ? (
				<input
					type="text"
					className="group_block__input"
					placeholder="Введите название"
					value={groupName}
					onChange={(e) => setGroupName(e.target.value)}
				/>
			) : (
				<>
					<Link to={`/tasks/${_id}`}>
						<p>{groupName}</p>
					</Link>
					<div className="group_block__buttons">
						<AiOutlineEdit
							className="button--icon"
							onClick={() => setEdit(true)}
						/>
						<AiOutlineDelete
							className="button--icon"
							onClick={() => setShowDelete(true)}
						/>
					</div>
				</>
			)}

			<div className="group_block__edit_block">
				<ColorPicker onColorChange={onColorChange} defaultColor={color!} />
				<div className="group_block__edit_block__controls">
					<button className="button cancel" onClick={() => setEdit(false)}>
						Отменить
					</button>
					<button onClick={editAccept} className="button accept">
						Принять
					</button>
				</div>
			</div>
			{showDelete && (
				<Dialog
					header="Удаление"
					onSubmit={handleSubmit}
					onDecline={() => setShowDelete(false)}
				>
					<p>Вы действительно хотите удалить эту группу?</p>
				</Dialog>
			)}
		</div>
	);
};

export default Group;
