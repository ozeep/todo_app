import React from "react";
import { connect } from "react-redux";
import { IGroup } from "../redux/types";
import { Group, AddGroup } from "./";
import { useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";

interface ISidebar {
	groups?: IGroup[];
}

const Sidebar = ({ groups }: ISidebar) => {
	const history = useHistory();

	React.useEffect(() => {
		if (groups && groups.length > 0) history.push(`/tasks/${groups[0]._id}`);
		else history.push(`/home/`);
	});

	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<AddGroup />
				<div className="separator"></div>
			</div>

			<PerfectScrollbar>
				<div className="groups__container">
					{groups!.map((group) => (
						<Group {...group} key={group._id} />
					))}
				</div>
			</PerfectScrollbar>
		</div>
	);
};

export default connect(({ groups }: any) => ({
	groups,
}))(Sidebar);
