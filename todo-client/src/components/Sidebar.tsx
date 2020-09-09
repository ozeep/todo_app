import React from "react";
import { connect, useDispatch } from "react-redux";
import { IGroup, ReduxDispatch, IUserState } from "../redux/types";
import { Group, AddGroup } from "./";
import { useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { fetchGroups } from "../redux/actions/groups";
import Spinner from "./loader/Spinner";

interface ISidebar {
	groups?: IGroup[];
	userState?: IUserState;
}

const Sidebar = ({ groups, userState }: ISidebar) => {
	const history = useHistory();
	const dispatch = useDispatch<ReduxDispatch>();
	const [isLodaing, setisLoading] = React.useState(false);

	React.useEffect(() => {
		if (groups && groups.length > 0) history.push(`/tasks/${groups[0]._id}`);
		else history.push(`/home/`);
	});

	React.useEffect(() => {
		setisLoading(true);
		if (userState)
			dispatch(fetchGroups(userState!.user!._id!)).then(() => {
				setisLoading(false);
			});
	}, [userState]);

	return (
		<div className="sidebar">
			{isLodaing ? (
				<Spinner />
			) : (
				<>
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
				</>
			)}
		</div>
	);
};

export default connect(({ groups, user }: any) => ({
	groups,
	userState: user,
}))(Sidebar);
