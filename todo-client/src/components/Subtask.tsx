import React from "react";
import classNames from "classnames";
import Icon from "@material-ui/core/Icon";

interface Subtask {
  name: string;
  compleated: boolean;
  onDelete(): void;
}

const Subtask = ({ name, compleated, onDelete }: Subtask) => {
  const [isCompleated, setIsCompleated] = React.useState<boolean>(compleated);

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
      <Icon onClick={onDelete} className="button--icon">
        delete
      </Icon>
    </div>
  );
};

export default Subtask;
