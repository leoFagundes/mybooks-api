import express from "express";
import cors from "cors";
import connectDB from "./configs/dbConnect.js";
import routes from "./routes/index.js";

const connection = await connectDB();

connection.on("error", (error) => {
  console.error("Connection error", error);
});

connection.once("open", () => {
  console.log("Database connection successfully");
});

const app = express();
app.use(cors());
routes(app);

export default app;
