import express from "express";
import cors from "cors";
import global_error_handler from "./middlewares/global_error_handler";
import unsupported_route from "./middlewares/unsupported_route";
import indexRouter from "./routes";
import http from "http";
import { WebSocketServer } from "ws";

const is_production = process.env.NODE_ENV === "production";
const is_development = process.env.NODE_ENV === "development";

const app = express();

app.use(express.json());

if (is_development) {
    app.use(cors());
}

if (is_production) {
    app.use(express.static("public"));
}

app.use(indexRouter);

app.use(["/api/*", "/auth/*"], unsupported_route);

if (is_production) {
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root: "public" });
    });
}

app.use(global_error_handler);

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export const wss = new WebSocketServer({ server });
export const clients = new Set<WebSocket>();

wss.on("connection", (ws) => {
    //@ts-ignore
    clients.add(ws);

    ws.on("close", () => {
        //@ts-ignore
        clients.delete(ws);
    });
});
