import { Users } from "../models";
import { client } from "../connection";
import { v4 } from "uuid";

const users = client.db("Logs").collection("users");

async function register(new_user: Users.BaseUser) {
    const id = v4();
    const results = await users.insertOne({ id, ...new_user });
    return { ...results, id };
}

async function find({ email }: Users.User) {
    return await users.findOne<Users.User>({ email });
}

export default {
    find,
    register,
};
