import express from "express";
import { createTask, deleteTask, getAllTasks, updateTask } from "../controllers/task.controller";


const router = express.Router();
router.route('/createTask').post(createTask);
router.route('/updateTask').put(updateTask);
router.route('/deleteTask').delete(deleteTask);
router.route('/getAllTasks').get(getAllTasks)


export default router;