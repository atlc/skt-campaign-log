import express from "express";
import cors from "cors";
import global_error_handler from "./middlewares/global_error_handler";
import unsupported_route from "./middlewares/unsupported_route";

const is_production = process.env.NODE_ENV === "production";
const is_development = process.env.NODE_ENV === "development";

const app = express();

if (is_development) {
    app.use(cors());
}

if (is_production) {
    app.use(express.static("public"));
}

// all our api routes
app.get("/api/hello", (req, res) => {
    res.json({ message: "World" });
});

app.use(["/api/*", "/auth/*"], unsupported_route);

if (is_production) {
    app.get("*", (req, res) => {
        res.sendFile("index.html", { root: "public" });
    });
}

app.use(global_error_handler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
