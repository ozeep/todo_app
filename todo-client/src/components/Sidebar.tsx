import React from "react";
import AddGroup from "./AddGroup";
import { connect } from "react-redux";
import { IGroup } from "../redux/types";
import Group from "./Group";

interface ISidebar {
  groups?: IGroup[];
}

const Sidebar = ({ groups }: ISidebar) => {
  return (
    <div className="sidebar">
      <AddGroup />
      <div className="separator"></div>
      {groups!.map((group) => (
        <Group {...group} key={group._id} />
      ))}
    </div>
  );
};

export default connect(({ groups }: any) => ({
  groups,
}))(Sidebar);
