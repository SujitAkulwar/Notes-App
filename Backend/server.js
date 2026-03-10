import "dotenv/config";
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";

import errorHandler from "./src/middleware/middleware.js";
import noteRoutes from "./src/routers/Routes.js";

const app = express();

app.use(cors());
app.use(json());

// Routes
app.use("/api/notes", noteRoutes);

app.use(errorHandler);

// MongoDB connection
connect(process.env.mongodb_url)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

export default app;