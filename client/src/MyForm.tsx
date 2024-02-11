import { useState } from "react";
import { socket } from "./Socket";

export function MyForm() {
	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	function reset() {
		setIsLoading(false);
		setValue("");
	}

	async function onSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
		event.preventDefault();
		setIsLoading(true);
		socket.emit("message", value);
		reset();
	}

	return (
		<form onSubmit={onSubmit}>
			<input value={value} onChange={(e) => setValue(e.target.value)} />

			<button type="submit" disabled={isLoading}>
				Submit
			</button>
		</form>
	);
}
