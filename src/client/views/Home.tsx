import React, { useEffect, useState } from "react";
import { GET } from "../services/fetcher";
import ChatInput from "../components/Chat/Input";
import Entry from "../components/Chat/Entry";
import { Log } from "../types";

const Home = () => {
    const [logChunks, setLogChunks] = useState<{ [key: string]: Log[] }>({});
    const [socket, setSocket] = useState<WebSocket>();

    const get_logs = () =>
        GET<Log[]>("/api/logs").then((logs) => {
            const chunks = {} as { [key: string]: Log[] };

            logs.forEach((log) => {
                const day = new Date(log.created_at);
                const day_string = day.toLocaleDateString();
                if (!chunks[day_string]) {
                    chunks[day_string] = [log];
                } else {
                    chunks[day_string] = [log, ...chunks[day_string]];
                }
            });

            setLogChunks(chunks);
        });

    useEffect(() => {
        get_logs();

        const ws_url = process.env.SERVER_URL ? process.env.SERVER_URL.replace("http", "wss") : window.location.href.replace(/https?/g, "wss");
        const ws = new WebSocket(ws_url);
        setSocket(ws);

        ws.onmessage = (event) => {
            get_logs();
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
            {Object.keys(logChunks).map((chunk) => (
                <div style={{ border: "1px solid #c53131", marginTop: "30px", padding: "10px" }}>
                    <h1 style={{ textAlign: "center" }}>
                        <span className="log" style={{ fontSize: "2rem" }}>
                            {chunk}
                        </span>
                    </h1>
                    <hr style={{ color: "#c53131", marginLeft: "20vw", marginRight: "20vw" }} />
                    <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
                        {logChunks[chunk].map((log) => (
                            <Entry key={log.id} {...log} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
