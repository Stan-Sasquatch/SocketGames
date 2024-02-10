import { useState } from "react";

function App() {
	const [data, setData] = useState<string | null>(null);
	async function getServerData() {
		const response = await fetch("http://localhost:3000/");
		const newData = (await response.json()) as { data: string };
		setData(newData.data);
	}

	return (
		<>
			<div className="card">{data && <p>{data}</p>}</div>
			<button onClick={getServerData}>Click to pull data from server</button>
		</>
	);
}

export default App;
