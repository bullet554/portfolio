import express from "express";
import routes from "./routes"
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
    res.status(200).json({ message: "Server is running" });
});

app.use("/api", routes)

app.use((_req, res) => {
    res.status(404).json({ message: "Route not found" });
});

app.use(errorMiddleware);

export default app;