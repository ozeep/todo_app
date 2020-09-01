import React from "react";
import ColorPicker, { IColor } from "./ColorPicker";
import Icon from "@material-ui/core/Icon";
import { Link, useRouteMatch } from "react-router-dom";
import classNames from "classnames";
import { IGroup } from "../redux/types";
import Dialog from "./Dialog";

const Group = ({ name, _id, color }: IGroup) => {
  const [colorState, setColorState] = React.useState<IColor>(color);
  const [edit, setEdit] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);

  const [title, setTitle] = React.useState(name);
  const [groupName, setGroupName] = React.useState(name);

  let match = useRouteMatch(`/${_id}`);

  const onColorChange = ({ hue, saturation, light }: IColor) => {
    setColorState((prevState) => ({
      ...prevState,
      hue,
      saturation,
      light,
    }));
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const editAccept = () => {
    setGroupName(title);
    setEdit(false);
  };

  const handleSubmit = () => {
    console.log("deleted");
    setShowDelete(false);
  };

  const handleDecline = () => {
    console.log("not deleted");
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
          value={title}
          onChange={onTitleChange}
        />
      ) : (
        <>
          <Link to={`/${_id}`}>
            <p>{groupName}</p>
          </Link>
          <Icon className="button--icon" onClick={() => setEdit(true)}>
            create
          </Icon>
          <Icon className="button--icon" onClick={() => setShowDelete(true)}>
            delete
          </Icon>
        </>
      )}

      <div className="group_block__edit_block">
        <ColorPicker onColorChange={onColorChange} defaultColor={color} />
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
          text="Вы действительно хотите удалить эту группу?"
          onSubmit={handleSubmit}
          onDecline={handleDecline}
        />
      )}
    </div>
  );
};

export default Group;
