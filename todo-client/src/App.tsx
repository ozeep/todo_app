import React from "react";
import { isUserLoged } from "./redux/actions/user";
import LoginPage from "./pages/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import LiquidLoader from "./components/loader/LiquidLoader";
import HomePage from "./pages/HomePage";
import { ReduxDispatch } from "./redux/types";
import { RootState } from "./redux/reducers";

function App() {
	const [isLoading, setIsLoading] = React.useState(false);
	const dispatch = useDispatch<ReduxDispatch>();

	const user = useSelector((state: RootState) => state.user);

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
				) : user.isLoged ? (
					<HomePage />
				) : (
					<LoginPage />
				)}
			</div>
		</div>
	);
}

export default App;
