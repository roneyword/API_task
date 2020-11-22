import { Router } from "express";
import commentController from "../controller/CommentController";

const commentsRouter = Router();

const commentsController = new commentController();

commentsRouter.get("/", commentsController.listComments);
commentsRouter.post("/", commentsController.createComments);
commentsRouter.put("/:id", commentsController.updateComments);
commentsRouter.delete("/:id", commentsController.deleteComments);

export default commentsRouter;
