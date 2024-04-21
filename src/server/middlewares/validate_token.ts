import type { RequestHandler } from "express";
import tokens from "../utils/tokens";

const validate_token: RequestHandler = (req, res, next) => {
    const auth_header = req.headers.authorization;

    if (!auth_header) {
        return next("Missing authentication headers");
    }

    if (typeof auth_header !== "string") {
        return next("Authentication headers were not a flattened string");
    }

    const [type, token] = auth_header.split(" ");

    if (!type || !token) {
        return next("Malformed or missing header components");
    }

    if (type.toLocaleLowerCase() !== "bearer") {
        return next("Incorrect token format");
    }

    const [header, payload, signature] = token.split(".");
    if (!header || !payload || !signature) {
        return next("Malformed token");
    }

    if (header.substring(0, 2) !== "ey") {
        return next("Not a JWT");
    }

    try {
        const user = tokens.verify(token);
        req.user = { ...user };
        next();
    } catch (error) {
        next(error);
    }
};

export default validate_token;
