import express from "express";
import WebSocket from "ws";
import db from "../../db";
import { clients } from "../../server";
import random_messages from "../../utils/random_messages";

const router = express.Router();

async function send_updated_logs() {
    try {
        const logs = await db.logs.get();
        const users = await db.users.get();

        const merged_logs = logs.map((log) => ({ ...log, user: users.find((user) => user.id === log.user_id) }));

        clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(merged_logs));
            }
        });
    } catch (error) {
        console.log(error);
    }
}

router.get("/", async (req, res, next) => {
    try {
        const logs = await db.logs.get();
        const users = await db.users.get();

        const merged_logs = logs.map((log) => ({ ...log, user: users.find((user) => user.id === log.user_id) }));

        res.json(merged_logs);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    const { content } = req.body;
    const user_id = req.user.id;

    if (!content || typeof content !== "string" || content.length > 1024) {
        return res.status(400).json({ message: "Content of the message must be between 1 and 1024 characters", title: random_messages.error() });
    }

    try {
        const results = await db.logs.create({ user_id, content });
        res.status(201).json(results);
        send_updated_logs();
    } catch (error) {
        next(error);
    }
});

router.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const { content } = req.body;
    const user_id = req.user.id;

    if (!content || typeof content !== "string" || content.length > 1024) {
        return res.status(400).json({ message: "Content of the message must be between 1 and 1024 characters", title: random_messages.error() });
    }

    try {
        const results = await db.logs.update({ id, user_id, content });
        res.status(201).json(results);
        send_updated_logs();
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", async (req, res, next) => {
    const id = req.params.id;
    const user_id = req.user.id;

    try {
        const results = await db.logs.delete({ id, user_id });
        res.status(201).json(results);
        send_updated_logs();
    } catch (error) {
        next(error);
    }
});

export default router;
