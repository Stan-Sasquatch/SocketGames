import { useState, useEffect } from "react";
import { socket } from "./Socket";
import { ConnectionState } from "./ConnectionState";
import { ConnectionManager } from "./ConnectionManager";
import { MyForm } from "./MyForm";
import { Events } from "./Events";

export function Chat() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [fooEvents, setFooEvents] = useState<Array<string>>([]);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onMessageEvent(value: string) {
			setFooEvents((previous) => [...previous, value]);
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("message", onMessageEvent);

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("message", onMessageEvent);
		};
	}, []);

	return (
		<>
			<ConnectionState isConnected={isConnected} />
			<Events events={fooEvents} />
			<ConnectionManager />
			<MyForm />
		</>
	);
}
