import express from "express";
import dotenv from "dotenv";

const app = express();

app.listen(8000, () => {
    console.log("Server is running on 8000");
});

