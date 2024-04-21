import jwt from "jsonwebtoken";
import { Users } from "../db/models";
import config from "../config";

const decode = (token: string) => {
    return jwt.decode(token) as Users.Payload;
};

const sign = (payload: Users.Payload) => {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiration });
};

const verify = (token: string) => {
    return jwt.verify(token, config.jwt.secret) as Users.Payload;
};

export default {
    decode,
    sign,
    verify,
};
