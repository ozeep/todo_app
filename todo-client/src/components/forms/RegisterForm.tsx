import React from "react";
import { Formik, Form, Field } from "formik";
import { connect, useDispatch } from "react-redux";
import { IUserState } from "../../redux/types";
import { userLogin, userRegister } from "../../redux/actions/user";

interface IRegisterFormValues {
	name: string;
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
	if (!value) {
		error = "Поле не может быть пустым";
	} else if (value.length < 4) {
		error = "Минимальная длинна пароля 4 символа";
	}
	return error;
}

function validateName(value: string) {
	let error;
	if (!value) {
		error = "Поле не может быть пустым";
	} else if (value.length < 3) {
		error = "Минимальная длинна имени 3 символа";
	}
	return error;
}

const RegisterForm = ({ error }: IUserState) => {
	const initialValues: IRegisterFormValues = {
		email: "",
		password: "",
		name: "",
	};
	const dispatch = useDispatch();

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={(values, actions) => {
				dispatch(userRegister(values));
				actions.setSubmitting(false);
			}}
		>
			{({ isSubmitting, errors }) => (
				<Form>
					<h1>Регистрация</h1>
					<p className="errors">{error || errors.name}</p>
					<Field
						name="name"
						type="text"
						placeholder="Имя"
						validate={validateName}
					/>
					<p className="errors">{errors.email}</p>
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
						placeholder="Пароль"
						validate={validatePassword}
					/>
					<p></p>
					<button type="submit" disabled={isSubmitting}>
						Зарегистрироваться
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default connect((state: any) => ({
	error: state.user.error,
}))(RegisterForm);
