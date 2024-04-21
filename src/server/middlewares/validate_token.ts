import type { RequestHandler } from "express";
import tokens from "../utils/tokens";
import random_messages from "../utils/random_messages";

const validate_token: RequestHandler = (req, res, next) => {
    const auth_header = req.headers.authorization;

    if (!auth_header) {
        return res.status(401).json({ message: "Missing authentication headers", title: random_messages.error() });
    }

    if (typeof auth_header !== "string") {
        return res.status(401).json({ message: "Authentication headers were not a flattened string", title: random_messages.error() });
    }

    const [type, token] = auth_header.split(" ");

    if (!type || !token) {
        return res.status(401).json({ message: "Malformed or missing header components", title: random_messages.error() });
    }

    if (type.toLocaleLowerCase() !== "bearer") {
        return res.status(401).json({ message: "Incorrect token format", title: random_messages.error() });
    }

    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) {
        return res.status(401).json({ message: "Malformed token", title: random_messages.error() });
    }

    if (header.substring(0, 2) !== "ey") {
        return res.status(401).json({ message: "Not a JWT", title: random_messages.error() });
    }

    try {
        const user = tokens.verify(token);
        req.user = { ...user };
        next();
    } catch (error) {
        res.status(401).json({ message: (error as Error).message, title: random_messages.error() });
    }
};

export default validate_token;
