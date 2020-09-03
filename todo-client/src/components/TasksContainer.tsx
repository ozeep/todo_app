import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { fetchTasks } from "../redux/actions/tasks";
import Task from "./Task";
import { ITask } from "../redux/types";

interface ITaskContainer {
  tasks: ITask[];
}

const TasksContainer = ({ tasks }: ITaskContainer) => {
  const { groupId }: any = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTasks(groupId));
  }, [groupId]);

  return (
    <>
      {tasks.map((task: ITask) => (
        <Task {...task} key={task._id} />
      ))}
    </>
  );
};

export default connect(({ tasks }: ITaskContainer) => ({
  tasks,
}))(TasksContainer);
