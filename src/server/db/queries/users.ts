import { UsersModel } from "../models";
import { client } from "../connection";
import { v4 } from "uuid";

const users = client.db("Logs").collection("users");

async function add_image({ character_image_url, id }: { character_image_url: string; id: string }) {
    const updated_at = new Date().toISOString();
    return await users.updateOne({ id }, { $set: { character_image_url, updated_at } });
}

async function find({ email }: { email: string }) {
    return await users.findOne<UsersModel.User>({ email });
}

async function get() {
    return await users.find<UsersModel.User>({}, { projection: { email: 0, password: 0 } }).toArray();
}

async function profile({ id }: { id: string }) {
    return await users.findOne<UsersModel.User>({ id }, { projection: { password: 0 } });
}

async function register(new_user: UsersModel.BaseUser) {
    const id = v4();
    const created_at = new Date().toISOString();
    const results = await users.insertOne({ id, created_at, ...new_user });
    return { ...results, id };
}

export default {
    add_image,
    find,
    get,
    profile,
    register,
};
