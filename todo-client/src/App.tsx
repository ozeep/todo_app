import React from "react";
import { useDispatch } from "react-redux";
import { isUserLoged } from "./redux/actions/user";
import Route from "./Route";

function App() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(isUserLoged());
	}, []);

	return <Route />;
}

export default App;
