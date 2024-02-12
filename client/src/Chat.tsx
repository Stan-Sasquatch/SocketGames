import { useState, useEffect } from "react";
import { socket } from "./Socket";
import { ConnectionState } from "./ConnectionState";
import { ConnectionManager } from "./ConnectionManager";
import { MyForm } from "./MyForm";
import { Events } from "./Events";
import { OffSocketEvent, OnSocketEvent } from "./socket/helpers";

export function Chat() {
	const [isConnected, setIsConnected] = useState(socket.connected);
	const [messages, setMessages] = useState<Array<string>>([]);

	useEffect(() => {
		function onConnect() {
			setIsConnected(true);
		}

		function onDisconnect() {
			setIsConnected(false);
		}

		function onMessageEvent(value: string) {
			setMessages((previous) => [...previous, value]);
		}

		OnSocketEvent({ type: "connect", callBack: onConnect });
		OnSocketEvent({ type: "disconnect", callBack: onDisconnect });
		OnSocketEvent({ type: "message", callBack: onMessageEvent });

		return () => {
			OffSocketEvent({ type: "connect", callBack: onConnect });
			OffSocketEvent({ type: "disconnect", callBack: onDisconnect });
			OffSocketEvent({ type: "message", callBack: onMessageEvent });
		};
	}, []);

	return (
		<>
			<ConnectionState isConnected={isConnected} />
			<Events events={messages} />
			<ConnectionManager />
			<MyForm />
		</>
	);
}
