import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotenv from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use() are function calls that happene between request and response.
app.use(express.json()); // to parse req.body as JSON
app.use(express.urlencoded({ extended: true })); // to parse form data (urlencoded)

app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
    const data = {
        message: 'Hello, this is JSON!',
        status: 'success'
    };
    res.json(data);
});

// Second argument is a callback function that will be called when the server is running and ready to receive responses.
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectMongoDB();
});

