import { UsersModel } from "../models";
import { client } from "../connection";
import { v4 } from "uuid";

const users = client.db("Logs").collection("users");

async function register(new_user: UsersModel.BaseUser) {
    const id = v4();
    const created_at = new Date().toISOString();
    const results = await users.insertOne({ id, created_at, ...new_user });
    return { ...results, id };
}

async function find({ email }: { email: string }) {
    return await users.findOne<UsersModel.User>({ email });
}

export default {
    find,
    register,
};
