import jwt from "jsonwebtoken";
import { UsersModel } from "../db/models";
import config from "../config";

const decode = (token: string) => {
    return jwt.decode(token) as UsersModel.Payload;
};

const sign = (payload: UsersModel.Payload) => {
    return jwt.sign(payload, config.jwt.secret, { expiresIn: config.jwt.expiration });
};

const verify = (token: string) => {
    return jwt.verify(token, config.jwt.secret) as UsersModel.Payload;
};

export default {
    decode,
    sign,
    verify,
};
