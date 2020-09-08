import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { connect, useDispatch } from "react-redux";
import { fetchGroups } from "./redux/actions/groups";
import LiquidLoader from "./components/loader/LiquidLoader";

const Route = ({ userState }: any) => {
	const dispatch = useDispatch();

	React.useEffect(() => {
		if (userState.user) dispatch(fetchGroups(userState.user._id));
	});

	return (
		<div>
			<div className="App">
				{Object.keys(userState).length === 0 ? (
					<LiquidLoader />
				) : userState.isLoged ? (
					<HomePage />
				) : (
					<LoginPage />
				)}
			</div>
		</div>
	);
};

export default connect(({ user }: any) => ({
	userState: user,
}))(Route);
