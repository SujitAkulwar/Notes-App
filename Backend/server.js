import "dotenv/config";
import express, { json } from "express";
import cors from "cors";

import connectDB from "./src/db/connect.js";
import errorHandler from "./src/middleware/middleware.js";
import noteRoutes from "./src/routers/Routes.js";

const app = express();
console.log(process.env.mongodb_url , "mongodb");
app.use(cors());
app.use(json());

app.use("/api/notes", noteRoutes);

app.use(errorHandler);

await connectDB();

export default app;