import { useEffect, useState } from "react";
import { OffSocketEvent, OnSocketEvent } from "./socket/helpers";
import { socket } from "./Socket";

export function NewChat() {
	const [messages, setMessages] = useState<Array<string>>([]);
	const [currentMessage, setCurrentMessage] = useState("");
	const [roomName, setRoomName] = useState("");

	function connectToSocket() {
		if (!socket.connected) {
			socket.connect();
		}
	}
	useEffect(() => {
		function onConnect() {
			setMessages((prevState) => [
				...prevState.filter((m) => m != getConnectionMessage(socket.id)),
				getConnectionMessage(socket.id),
			]);
		}

		if (!socket.connected) {
			OnSocketEvent({ type: "connect", callBack: onConnect });
		}

		return () => {
			OffSocketEvent({ type: "connect", callBack: onConnect });
		};
	}, [currentMessage]);

	return (
		<div>
			<div>
				<ul>
					{messages.map((m) => (
						<li>{m}</li>
					))}
				</ul>
			</div>
			<div>
				<input
					value={currentMessage}
					disabled={!socket.connected}
					onChange={(e) => setCurrentMessage(e.currentTarget.value)}
				/>
				<button
					type="submit"
					disabled={!socket.connected}
					onClick={() => setMessages((prevState) => [...prevState, currentMessage])}
				>
					Send
				</button>
			</div>

			<div>
				<input value={roomName} disabled={!socket.connected} onChange={(e) => setRoomName(e.currentTarget.value)} />
				<button type="submit" disabled={!socket.connected}>
					Join
				</button>
			</div>
			<div>
				<button type="submit" disabled={socket.connected} onClick={connectToSocket}>
					Connect
				</button>
			</div>
		</div>
	);

	function getConnectionMessage(test: string | undefined) {
		return `You connected with id ${test}`;
	}
}
