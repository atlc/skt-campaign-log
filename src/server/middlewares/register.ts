import type { RequestHandler } from "express";
import { UsersModel } from "../db/models";
import { validate_required_strings } from "../utils/validators";
import random_messages from "../utils/random_messages";

const validate_registration_data: RequestHandler = (req, res, next) => {
    const { name, email, password, character_name, character_url }: UsersModel.BaseUser = req.body;

    const issues = validate_required_strings({
        name: { value: name, min: 1, max: 64 },
        email: { value: email, min: 1, max: 128 },
        password: { value: password, min: 1, max: 128 },
        character_name: { value: character_name, min: 1, max: 128 },
        character_url: { value: character_url, min: 1, max: 128 },
    });

    if (issues.length) {
        return res.status(400).json({ message: issues, title: random_messages.error() });
    }

    next();
};

export default validate_registration_data;
