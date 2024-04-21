import type { RequestHandler } from "express";
import bcrypt from "bcrypt";
import { UsersModel } from "../db/models";
import { validate_required_strings } from "../utils/validators";
import db from "../db";
import random_messages from "../utils/random_messages";

const validate_login: RequestHandler = async (req, res, next) => {
    const { email, password }: UsersModel.BaseUser = req.body;

    const issues = validate_required_strings({
        email: { value: email, min: 1, max: 128 },
        password: { value: password, min: 1, max: 128 },
    });

    if (issues.length) {
        return res.status(400).json({ message: issues, title: random_messages.error() });
    }

    try {
        const trimmed = { email: email.trim(), password: password.trim() };

        const user = await db.users.find({ email: trimmed.email });

        if (!user) return res.status(401).json({ message: `Bad email - double check '${trimmed.email}' and try again`, title: random_messages.error() });

        const matched_password = await bcrypt.compare(trimmed.password, user.password);

        if (!matched_password) return res.status(401).json({ message: `Invalid password`, title: random_messages.error() });

        delete req.body;

        const { id, name, character_name } = user;
        req.user = { id, name, character_name };
        next();
    } catch (error) {
        next(error);
    }
};

export default validate_login;
