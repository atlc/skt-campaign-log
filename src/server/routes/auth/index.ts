import bcrypt from "bcrypt";
import express from "express";
import db from "../../db";
import { Users } from "../../db/models";
import validate_registration_data from "../../middlewares/register";
import tokens from "../../utils/tokens";

const router = express.Router();

router.post("/register", validate_registration_data, async (req, res) => {
    const { name, email, password, character_name, character_url, character_image_url }: Users.BaseUser = req.body;

    try {
        const hashed = await bcrypt.hash(password, 12);
        const new_user: Users.BaseUser = { name, email, password: hashed, character_name, character_url };
        delete req.body.password;

        if (character_image_url) {
            new_user.character_image_url = character_image_url;
        }

        const { id } = await db.users.register(new_user);
        const payload: Users.Payload = { id, name, character_name };
        const token = tokens.sign(payload);

        return res.status(201).json({ message: "Huzzah! Successfully registered your character", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Welp, Andrew TPKed the server. Click the copy button below and send him the following error dump", error });
    }
});

export default router;
