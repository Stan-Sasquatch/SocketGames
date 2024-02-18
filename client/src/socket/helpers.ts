import { socket } from "../Socket";
type OnEvent = { type: "connect"; callBack: () => void };

type OffEvent = { type: "connect"; callBack: () => void };

type EmitEvent = { type: "message"; value: string };

export function OnSocketEvent({ type, callBack }: OnEvent) {
	socket.on(type, () => callBack());
}

export function OffSocketEvent({ type, callBack }: OffEvent) {
	socket.off(type, () => callBack());
}

export function EmitSocketEvent({ type, value }: EmitEvent) {
	socket.emit(type, value);
}
