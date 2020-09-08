import React from "react";
import ColorPicker, { IColor } from "./ColorPicker";
import { useDispatch, connect } from "react-redux";
import { addGroup } from "../redux/actions/groups";

const AddGroup = ({ userId }: any) => {
	const [color, setColor] = React.useState({
		hue: 128,
		saturation: 37,
		light: 62,
	});

	const [edit, setEdit] = React.useState(false);
	const [name, setName] = React.useState("");

	const dispatch = useDispatch();

	const onColorChange = (color: IColor) => {
		setColor((prevState) => ({
			...prevState,
			hue: color.hue,
			saturation: color.saturation,
			light: color.light,
		}));
	};

	const handleAddGroup = () => {
		dispatch(addGroup({ name, color, userId }));
		setEdit(false);
		setName("");
	};

	return (
		<div
			className={`group_block ${!edit ? "" : "edit"}`}
			style={{
				backgroundColor: edit
					? `hsl(${color.hue}, ${color.saturation}%, ${color.light}%)`
					: "#e6e6e6",
			}}
		>
			{edit ? (
				<input
					type="text"
					className="group_block__input"
					placeholder="Введите название..."
					onChange={(e) => setName(e.target.value)}
				/>
			) : (
				<div className="group_block__title">
					<p style={{ color: `#717171` }} onClick={() => setEdit(true)}>
						Добавить проект
					</p>
				</div>
			)}

			<div className="group_block__edit_block">
				<ColorPicker onColorChange={onColorChange} defaultColor={color} />
				<div className="group_block__edit_block__controls">
					<button className="button cancel" onClick={() => setEdit(false)}>
						Отменить
					</button>
					<button onClick={handleAddGroup} className="button accept">
						Принять
					</button>
				</div>
			</div>
		</div>
	);
};

export default connect(({ user }: any) => ({
	userId: user.user._id,
}))(AddGroup);
