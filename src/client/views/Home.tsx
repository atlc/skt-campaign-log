import React, { useEffect, useState } from "react";
import { GET } from "../services/fetcher";
import ChatInput from "../components/Chat/Input";
import Entry from "../components/Chat/Entry";
import { Log } from "../types";

const Home = () => {
    const [logs, setLogs] = useState<Log[]>([]);
    const [socket, setSocket] = useState<WebSocket>();

    const get_logs = () => GET("/api/logs").then(setLogs);

    useEffect(() => {
        get_logs();
        const ws = new WebSocket(process.env.SERVER_URL!.replace("http", "ws"));
        setSocket(ws);

        ws.onmessage = (event) => {
            const updated_logs = JSON.parse(event.data);
            setLogs(updated_logs);
        };

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div>
            <div className="row">
                <ChatInput />
            </div>
            {logs.map((log) => (
                <Entry key={log.id} {...log} />
            ))}
        </div>
    );
};

export default Home;
