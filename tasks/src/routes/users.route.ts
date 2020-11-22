import { Router } from "express";
import userController from "../controller/UserController";

const usersRouter = Router();

const usersController = new userController();

usersRouter.get("/", usersController.getUsers);
usersRouter.post("/", usersController.createUser);
usersRouter.put("/:id", usersController.updateUser);

export default usersRouter;
