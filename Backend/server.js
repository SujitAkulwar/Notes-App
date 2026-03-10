import "dotenv/config";
import express, { json } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import errorHandler from './src/middleware/middleware.js';
import noteRoutes from './src/routers/Routes.js';

const app = express();
app.use(cors());
app.use(json());

// Routes
app.use('/api/notes', noteRoutes);

app.use(errorHandler);

connect(process.env.mongodb_url)
  .then(() => app.listen(5000, () => console.log("Server running on port 5000")))
  .catch(err => console.log(err));