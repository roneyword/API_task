import { Router } from "express";
import sessionController from "../controller/SessionController";

const sessionsRoute = Router();

const sessionsController = new sessionController();

sessionsRoute.get("/", sessionsController.authUser);

export default sessionsRoute;
