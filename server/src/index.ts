import express from "express";
import dotenv from "dotenv";
import { Server, Socket } from "socket.io";
import { createServer } from "node:http";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

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

function onMessage(socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
	socket.on("message", (msg) => {
		io.emit("message", msg);
	});
}
io.on("connection", onMessage);

httpServer.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
