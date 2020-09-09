import React from "react";
import { isUserLoged } from "./redux/actions/user";
import LoginPage from "./pages/LoginPage";
import { connect, useDispatch } from "react-redux";
import LiquidLoader from "./components/loader/LiquidLoader";
import HomePage from "./pages/HomePage";
import { ReduxDispatch } from "./redux/types";

function App({ userState }: any) {
	const [isLoading, setIsLoading] = React.useState(false);
	const dispatch = useDispatch<ReduxDispatch>();

	React.useEffect(() => {
		setIsLoading(true);
		dispatch(isUserLoged()).then(() => {
			setIsLoading(false);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<div className="App">
				{isLoading ? (
					<LiquidLoader />
				) : userState.isLoged ? (
					<HomePage />
				) : (
					<LoginPage />
				)}
			</div>
		</div>
	);
}

export default connect(({ user }: any) => ({
	userState: user,
}))(App);
