import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use() are function calls that happene between request and response.
app.use(express.json()); // to parse req.body as JSON
app.use(express.urlencoded({ extended: true })); // to parse form data (urlencoded)

app.use(cookieParser());  // to parse cookies

app.use("/api/auth", authRoutes);

// Second argument is a callback function that will be called when the server is running and ready to receive responses.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});

