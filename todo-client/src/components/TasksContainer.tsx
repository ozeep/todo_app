import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { fetchTasks } from "../redux/actions/tasks";
import Task from "./Task";

const TasksContainer = ({ tasks }: any) => {
  const { groupId }: any = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchTasks(groupId));
  }, [groupId]);
  return tasks.map((task: any) => <Task name={task.name} />);
};

export default connect((state: any) => ({
  tasks: state.tasks,
}))(TasksContainer);
