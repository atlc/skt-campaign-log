import { Logs } from "../models";
import { client } from "../connection";
import { v4 } from "uuid";

const logs = client.db("Logs").collection("entries");

async function createEntry({ user_id, content }: Logs.BaseLog) {
    const id = v4();
    const results = await logs.insertOne({ id, user_id, content });
    return { ...results, id };
}

async function retrieveEntries() {
    return await logs.find<Logs.Log>({}).toArray();
}

async function updateComment({ id, user_id, content }: Logs.Log) {
    return await logs.updateOne({ id, user_id }, { $set: { content } });
}

async function deleteEntry({ id, user_id }: Logs.Log) {
    return await logs.deleteOne({ id, user_id });
}

export default {
    get: retrieveEntries,
    create: createEntry,
    update: updateComment,
    delete: deleteEntry,
};
