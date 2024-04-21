import type { RequestHandler } from "express";
import random_messages from "../utils/random_messages";

const unsupported_route: RequestHandler = (req, res) => {
    res.status(404).json({
        message: `Sorry, ${req.method.toUpperCase()} ${req.originalUrl} is not a supported route at this time`,
        title: random_messages.error(),
    });
};

export default unsupported_route;
