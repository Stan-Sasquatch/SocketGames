import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
	const [data, setData] = useState<string | null>(null);
	async function getServerData() {
		const response = await fetch("http://localhost:3000/");
		const newData = (await response.json()) as { data: string };
		setData(newData.data);
	}

	return (
		<>
			<div>
				<a href="https://vitejs.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>Vite + React</h1>
			<div className="card">{data && <p>{data}</p>}</div>
			<p className="read-the-docs">Click on the Vite and React logos to learn more</p>
			<button onClick={getServerData}>Click to pull data from server</button>
		</>
	);
}

export default App;
