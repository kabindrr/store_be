import express from "express";

const app = express();
const PORT = 8000;

app.listen(PORT, (error) => {
  error
    ? console.log("Server not connected")
    : console.log(`Server connected at http://localhost:${PORT}`);
});
