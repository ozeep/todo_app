import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReduxDispatch } from "../redux/types";
import { Group, AddGroup } from "./";
import { useHistory } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { fetchGroups } from "../redux/actions/groups";
import Spinner from "./loader/Spinner";
import { RootState } from "../redux/reducers";

const Sidebar = () => {
	const history = useHistory();
	const dispatch = useDispatch<ReduxDispatch>();
	const [isLodaing, setisLoading] = React.useState(false);

	const user = useSelector((state: RootState) => state.user.user);
	const groups = useSelector((state: RootState) => state.groups);

	React.useEffect(() => {
		if (groups && groups.length > 0) history.push(`/tasks/${groups[0]._id}`);
		else history.push(`/home/`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [groups]);

	React.useEffect(() => {
		setisLoading(true);

		if (user)
			dispatch(fetchGroups(user!._id!)).then(() => {
				setisLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return (
		<div className="sidebar">
			{isLodaing ? (
				<Spinner />
			) : (
				<>
					<div className="sidebar__header">
						<AddGroup userId={user!._id!} />
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

export default Sidebar;
