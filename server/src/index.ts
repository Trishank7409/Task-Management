import express,{ type Request, type Response } from "express";
import dotenv from 'dotenv';
import { initDB } from "./config/db.config";
import taskRouter from './routes/task.route'
import cors from 'cors'
const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT ?? 4000;

const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
};
app.use(cors(corsOpts));
app.use("/v1/task", taskRouter);

const startServer = async (): Promise<void> => {
    try {
      await initDB();
      app.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
      });
    } catch (error) {
      console.error('Error starting the server:', error);
    }
  };
  
  startServer();