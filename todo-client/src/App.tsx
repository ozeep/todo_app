import React from "react";
import { useDispatch, connect } from "react-redux";

import AddGroup from "./components/AddGroup";
import Group from "./components/Group";
import { fetchGroups } from "./redux/actions/groups";
import AlertContainer from "./components/Alert";
import { IGroup } from "./redux/types";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TasksContainer from "./components/TasksContainer";

interface App {
  onFetchGroups(): any;
  groups: IGroup[];
}

function App({ groups }: App) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchGroups());
  }, []);

  return (
    <div className="App">
      <Router>
        <div className="wrapper">
          <div className="header"></div>
          <div className="container">
            <div className="sidebar">
              <AddGroup />

              {groups.map((group) => (
                <Group {...group} key={group._id} />
              ))}
            </div>
            <div className="content">
              <Switch>
                <Route path={`/:groupId`}>
                  <TasksContainer />
                </Route>
              </Switch>
            </div>
          </div>
        </div>
        <AlertContainer />
      </Router>
    </div>
  );
}

export default connect(({ groups, tasks }: any) => ({
  groups,
  tasks,
}))(App);
