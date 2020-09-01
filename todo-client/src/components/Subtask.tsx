import React, { useContext } from "react";
import classNames from "classnames";
import Icon from "@material-ui/core/Icon";
import Dialog from "./Dialog";
import { ISubtask } from "../redux/types";

interface Subtask extends ISubtask {
  onDelete?(): void;
}

const Subtask = ({ name, compleated, onDelete }: Subtask) => {
  const [isCompleated, setIsCompleated] = React.useState<boolean>(compleated);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);

  const deleteTask = () => {
    setShowDeleteDialog(true);
  };

  const handleSubmit = () => {
    console.log("deleted");
    setShowDeleteDialog(false);
  };

  const handleDecline = () => {
    console.log("not deleted");
    setShowDeleteDialog(false);
  };

  return (
    <div className={classNames("task__sub_task", { isCompleated })}>
      <div className="checkbox">
        <input
          type="checkbox"
          name="checkbox"
          checked={isCompleated}
          onChange={(e) => setIsCompleated(e.target.checked)}
        />
        <label htmlFor="checkbox"></label>
      </div>

      <p className="task__sub_task__name">{name}</p>
      <Icon onClick={() => deleteTask()} className="button--icon">
        delete
      </Icon>
      {showDeleteDialog && (
        <Dialog
          header="Удаление"
          text="Вы действительно хотите удалить эту позадачу?"
          onSubmit={handleSubmit}
          onDecline={handleDecline}
        />
      )}
    </div>
  );
};

export default Subtask;
