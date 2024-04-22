import { LogsModel } from "../models";
import { client } from "../connection";
import { v4 } from "uuid";

const logs = client.db("Logs").collection("entries");

async function createEntry({ user_id, content }: LogsModel.BaseLog) {
    const id = v4();
    const created_at = new Date().toISOString();
    const results = await logs.insertOne({ id, user_id, content, created_at });
    return { ...results, id };
}

async function retrieveEntries() {
    return (await logs.find<LogsModel.Log>({}).toArray()).reverse();
}

async function updateComment({ id, user_id, content }: Partial<LogsModel.Log>) {
    const updated_at = new Date().toISOString();
    return await logs.updateOne({ id, user_id }, { $set: { content, updated_at } });
}

async function deleteEntry({ id, user_id }: Partial<LogsModel.Log>) {
    return await logs.deleteOne({ id, user_id });
}

export default {
    get: retrieveEntries,
    create: createEntry,
    update: updateComment,
    delete: deleteEntry,
};
