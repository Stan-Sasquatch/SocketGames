import express from "express";
import dotenv from "dotenv";
import { Server } from "socket.io";
import { createServer } from "node:http";

dotenv.config();

const port = +process.env.PORT!;
const clientOrigin = process.env.CLIENT_URL;

const app = express();
const httpServer = createServer(app);
const test = "http://localhost";
const io = new Server(httpServer, {
	cors: {
		origin: clientOrigin,
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["my-custom-header"],
		credentials: true,
	},
});

io.on("connection", (socket) => {
	console.log("a user connected 123");
});

httpServer.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
