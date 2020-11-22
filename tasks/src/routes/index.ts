import { Router } from "express";
import usersRouter from "../routes/users.route";
import tasksRouter from "../routes/tasks.route";
import commentsRouter from "../routes/comments.route";
import sessionsRoute from "./sessions.route";
import ensureAuth from "../middlewares/ensureAuthenticated";

const routes = Router();

routes.use("/sessions", sessionsRoute);

routes.use(ensureAuth);

routes.use("/users", usersRouter);
routes.use("/tasks", tasksRouter);
routes.use("/comments", commentsRouter);

export default routes;
