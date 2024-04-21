import type { ErrorRequestHandler } from "express";
import random_messages from "../utils/random_messages";

const server_TPK: ErrorRequestHandler = (error, req, res, next) => {
    console.log(error);
    res.status(500).json({
        message: "Welp, Andrew TPKed the server. Click the copy button below and send him the following error dump",
        title: random_messages.error(),
        error,
    });
};

export default server_TPK;
