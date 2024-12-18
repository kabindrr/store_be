import express from "express";
import morgan from "morgan";
import cors from "cors";
import { ResponseClient } from "./src/middlewares/ResponseClient.js";
import { errorHandler } from "./src/middlewares/ErrorHandler.js";

const app = express();
const PORT = 8000;

//middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  const message = "Server is Live";
  ResponseClient({ req, res, message });
});

app.use(errorHandler);

app.listen(PORT, (error) => {
  error
    ? console.log("Server not connected")
    : console.log(`Server connected at http://localhost:${PORT}`);
});
