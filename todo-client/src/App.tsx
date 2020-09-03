import React from "react";
import { useDispatch } from "react-redux";

import { useLocation, Switch, Route } from "react-router-dom";
import TasksContainer from "./components/TasksContainer";
import { Icon } from "@material-ui/core";
import { addTask } from "./redux/actions/tasks";
import Dialog from "./components/Dialog";
import Sidebar from "./components/Sidebar";
import AlertContainer from "./components/AlertContainer";
import { fetchGroups } from "./redux/actions/groups";

function App() {
  const [showAddTask, setShowAddTask] = React.useState(false);
  const [taskName, setTaskName] = React.useState<string>("");

  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const pathLink = pathname.includes("/tasks/")
    ? pathname.replace("/tasks/", "")
    : "";

  const handleSubmitAddTask = () => {
    dispatch(addTask(pathLink, taskName));
    setTaskName("");
    setShowAddTask(false);
  };

  React.useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  return (
    <div className="App">
      <div className="wrapper">
        <div className="header"></div>
        <div className="container">
          <Sidebar />
          <div className="content">
            <div className="content__header">
              <button
                onClick={() => setShowAddTask(true)}
                className="button reversed"
              >
                <Icon>add</Icon>
                <p>Добавить задачу</p>
              </button>
            </div>
            <div className="content__tasks">
              <Switch>
                <Route path={`/tasks/:groupId`}>
                  <TasksContainer />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
      </div>
      {showAddTask && (
        <Dialog
          header="Добавление задачи"
          onSubmit={handleSubmitAddTask}
          onDecline={() => setShowAddTask(false)}
        >
          <p>Название:</p>
          <input
            type="text"
            placeholder="Введите название"
            onChange={(e) => setTaskName(e.target.value)}
          />
        </Dialog>
      )}
      <AlertContainer />
    </div>
  );
}

export default App;
