import bcrypt from "bcrypt";
import express from "express";
import db from "../../db";
import { UsersModel } from "../../db/models";
import validate_registration_data from "../../middlewares/register";
import tokens from "../../utils/tokens";
import validate_login from "../../middlewares/login";
import random_messages from "../../utils/random_messages";

const router = express.Router();

router.post("/login", validate_login, async (req, res) => {
    const { id, name, character_name } = req.user;
    const payload = { id, name, character_name };
    const token = tokens.sign(payload);

    res.status(200).json({
        message: "I guess your login credentials were not in the forgotten realms - you successfully logged in.",
        title: random_messages.success(),
        token,
    });
});

router.post("/register", validate_registration_data, async (req, res, next) => {
    const { name, email, password, character_name, character_url, character_image_url }: UsersModel.BaseUser = req.body;

    try {
        const trimmed = { email: email.trim(), password: password.trim() };
        const hashed = await bcrypt.hash(trimmed.password, 12);
        const new_user: UsersModel.BaseUser = { name, email: trimmed.email, password: hashed, character_name, character_url };
        delete req.body.password;

        if (character_image_url) {
            new_user.character_image_url = character_image_url;
        }

        const { id } = await db.users.register(new_user);
        const payload: UsersModel.Payload = { id, name, character_name };
        const token = tokens.sign(payload);

        return res.status(201).json({ message: "Your character was successfully registered", title: `${random_messages.success()}`, token });
    } catch (error) {
        next(error);
    }
});

export default router;
