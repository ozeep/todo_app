import React from "react";
import classNames from "classnames";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const LoginPage = () => {
	const [signIn, setSignIn] = React.useState(true);

	return (
		<div className="authorization-wrapper">
			<div
				className={classNames("authorization-container", {
					right_panel_active: !signIn,
				})}
			>
				<div className="form-container sign-up-container">
					<RegisterForm />
				</div>
				<div className="form-container sign-in-container">
					<LoginForm />
				</div>
				<div className="overlay-container">
					<div className="overlay">
						<div className="overlay-panel overlay-left">
							<h1>С возвращением!</h1>
							<p>Для входа в свою доску введи свои данные</p>
							<button
								onClick={() => setSignIn(true)}
								className="ghost"
								id="signIn"
							>
								Вход
							</button>
						</div>
						<div className="overlay-panel overlay-right">
							<h1>Привет!</h1>
							<p>Зарегистрируйся для начала пользования доской</p>
							<button
								onClick={() => setSignIn(false)}
								className="ghost"
								id="signUp"
							>
								Регистрация
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
