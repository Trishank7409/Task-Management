import { Request, Response } from 'express';
import { open } from "sqlite";
import sqlite3 from "sqlite3";

const openDB = async () => {
    return open({
      filename: "./task.db",
      driver: sqlite3.Database,
    });
  };

export const createTask= async(req: Request, res: Response): Promise<void> => {

const { title, description, date, status } = req.body;
try {
  const db = await openDB();
  const result = await db.run(
    `INSERT INTO tasks (title, description, date, status) VALUES (?, ?, ?, ?)`,
    [title, description, date, status]
  );
  res.status(201).json({ id: result.lastID, message: "Task created successfully" });
  await db.close();
} catch (error) {
  res.status(500).json({ error: "Failed to create task", details: error });
}
}
export const updateTask= async(req: Request, res: Response): Promise<void> => {
    const  id  = req.query.id;
    const { title, description, date, status } = req.body;
    try {
        const db = await openDB();
        const result = await db.run(
          `UPDATE tasks SET title = ?, description = ?, date = ?, status = ? WHERE id = ?`,
          [title, description, date, status, id]
        );
        if (typeof result.changes === "number" && result.changes > 0) {
          res.json({ message: "Task updated successfully" });
        } else {
          res.status(404).json({ error: "Task not found" });
        }
        await db.close();
      } catch (error) {
        res.status(500).json({ error: "Failed to update task", details: error });
      }
 }

 export const deleteTask= async(req: Request, res: Response): Promise<void> => {
    const  id  = req.query.id;
  try {
    const db = await openDB();
    const result = await db.run(`DELETE FROM tasks WHERE id = ?`, [id]);
    if (typeof result.changes === "number" && result.changes > 0) {
      res.json({ message: "Task deleted successfully" });
    } else {
      res.status(404).json({ error: "Task not found" });
    }
    await db.close();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task", details: err });
  }
}

 export const getAllTasks= async(req: Request, res: Response): Promise<void> => {
    try {
        const db = await openDB();
        const tasks = await db.all(`SELECT * FROM tasks`);
        res.json(tasks);
        await db.close();
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch tasks", details: error });
      }
 }