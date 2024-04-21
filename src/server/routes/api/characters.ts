import path from "path";
import express from "express";
import multer from "multer";
import { v4 } from "uuid";
import { upload_image } from "../../services/digitalocean/image";
import random_messages from "../../utils/random_messages";
import config from "../../config";

const storage = multer.memoryStorage();

const mult = multer({
    storage,
});

const router = express.Router();

router.post("/upload", mult.single("upload"), async (req, res) => {
    try {
        const image = req.file;

        if (!image) {
            return res.status(400).json({ message: "Invalid or missing file", title: random_messages.error() });
        }

        const uuid = v4();
        const ext = path.extname(image.originalname);
        const Key = `${uuid}${ext}`;

        const results = await upload_image({ Body: image.buffer, Key });

        const image_url = `${config.digital_ocean.spaces_bucket_url}/${Key}`;

        res.json({ ...results, Key, image_url });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Could not process image" });
    }
});

export default router;
