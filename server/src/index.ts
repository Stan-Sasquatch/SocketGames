import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;
const clientOrigin = process.env.CLIENT_URL;
var corsOptions = {
	origin: clientOrigin,
	optionsSuccessStatus: 200,
};

console.log(corsOptions);
app.use(cors());
app.get("/", (req, res) => {
	res.send({ data: "Hello from the backend" });
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
