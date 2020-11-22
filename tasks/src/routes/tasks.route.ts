import { Router } from "express";
import taskController from "../controller/TaskController";

const tasksRouter = Router();

const tasksController = new taskController();

tasksRouter.post("/", tasksController.createTask);
tasksRouter.get("/", tasksController.listTask);
tasksRouter.put("/:id", tasksController.updateTask);
tasksRouter.delete("/:id", tasksController.deleteTask);

export default tasksRouter;
