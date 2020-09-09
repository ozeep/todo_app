import React from "react";
import { Formik, Form, Field } from "formik";
import { connect, useDispatch } from "react-redux";
import { IUserState, ReduxDispatch } from "../../redux/types";
import { userLogin } from "../../redux/actions/user";
import Spinner from "../loader/Spinner";

interface ILoginFormValues {
	email: string;
	password: string;
}

function validateEmail(value: string) {
	let error;
	if (!value) {
		error = "Поле не может быть пустым";
	} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
		error = "Неверная форма email";
	}
	return error;
}

function validatePassword(value: string) {
	let error;
	if (value === "admin") {
		error = "Хорошая попытка ;)";
	} else if (!value) {
		error = "Поле не может быть пустым";
	} else if (value.length < 4) {
		error = "Минимальная длинна пароля 4 символа";
	}
	return error;
}

const LoginForm = ({ error }: IUserState) => {
	const initialValues: ILoginFormValues = { email: "", password: "" };
	const dispatch = useDispatch<ReduxDispatch>();

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				const submit = async () => {
					dispatch(userLogin(values)).then(() => {
						actions.setSubmitting(false);
					});
				};
				submit();
			}}
		>
			{({ errors, isSubmitting }) => (
				<Form>
					<h1>Вход</h1>
					<p className="errors">{error || errors.email}</p>
					<Field
						name="email"
						type="email"
						placeholder="Email"
						validate={validateEmail}
					/>
					<p className="errors">{errors.password}</p>
					<Field
						name="password"
						type="password"
						placeholder="Password"
						validate={validatePassword}
					/>
					<p></p>
					{isSubmitting ? (
						<Spinner />
					) : (
						<button type="submit" disabled={isSubmitting}>
							Войти
						</button>
					)}
				</Form>
			)}
		</Formik>
	);
};

export default connect((state: any) => ({
	error: state.user.error,
}))(LoginForm);
