import { io } from "socket.io-client";

const config = {
	autoConnect: false,
	withCredentials: true,
	extraHeaders: {
		"my-custom-header": "abcd",
	},
};

export const socket = process.env.NODE_ENV === "production" ? io(config) : io("http://localhost:3000", config);
