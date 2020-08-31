import React from "react";
import ColorPicker from "./ColorPicker";

const AddGroup = () => {
  const [color, setColor] = React.useState({
    hue: 128,
    saturation: 37,
    light: 62,
  });
  const [edit, setEdit] = React.useState(false);

  const onColorChange = (color) => {
    setColor((prevState) => ({
      ...prevState,
      hue: color.hue,
      saturation: color.saturation,
      light: color.light,
    }));
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
          <button className="button accept">Принять</button>
        </div>
      </div>
    </div>
  );
};

export default AddGroup;
