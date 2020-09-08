const express = require("express");
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import settings from "../settings";

const User = express.Router();

User.post("/login", (req: any, res: any) => {
	let user = req.body.user;

	UserModel.findOne({ email: user.email }).then((usr: any) => {
		if (!usr) return res.json({ error: "Неверный email/пароль" });

		bcrypt.compare(user.password, usr.password).then((result) => {
			let userMod = { ...usr }._doc;
			delete userMod.password;

			if (!result) return res.json({ error: "Неверный email/пароль" });

			jwt.sign(
				{ userId: usr._id },
				settings.JWT_SECTRET,
				{
					algorithm: "HS256",
					expiresIn: "7d",
				},
				(err, token) => {
					return res.json({ user: userMod, token });
				}
			);
		});
	});
});

User.post("/isloged", (req: any, res: any) => {
	let token = req.body.token;

	jwt.verify(token, settings.JWT_SECTRET, (err: any, decoded: any) => {
		if (err) return res.json({ isLoged: false });

		UserModel.findOne({ _id: decoded.userId }).then((usr: any) => {
			if (!usr) return res.json({ isLoged: false });

			return res.json({ isLoged: true, user: usr });
		});
	});
});

User.post("/register", async (req: any, res: any) => {
	let user = req.body.user;

	let usr = await UserModel.findOne({ email: user.email });

	if (usr) return res.json({ error: "Пользователь уже существует" });

	bcrypt.hash(user.password, 5).then((pass) => {
		user.password = pass;

		new UserModel(user).save().then((doc: any) => {
			let userMod = { ...doc }._doc;
			delete userMod.password;

			jwt.sign(
				{ userId: doc._id },
				settings.JWT_SECTRET,
				{
					algorithm: "HS256",
					expiresIn: "7d",
				},
				(err, token) => {
					return res.json({ user: userMod, token });
				}
			);
		});
	});
});

export default User;
