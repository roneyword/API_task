import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Comment } from "./../entity/Comment";

class commentsController {
  public async listComments(req: Request, res: Response) {
    const listComments = await getRepository(Comment).find();

    return res.json(listComments);
  }

  public async createComments(req: Request, res: Response) {
    // const { comment, task_comment, user_comment } = req.body;

    const newComment = await getRepository(Comment).save(req.body);

    return res.json(newComment);
  }

  public async updateComments(req: Request, res: Response) {
    const { id } = req.params;

    const checkComment = await getRepository(Comment).update(id, req.body);

    if (checkComment.affected === 1) {
      const updatedTask = await getRepository(Comment).findOne(id);
      return res.json(updatedTask);
    }

    return res.status(404).json({ mensagem: "Commentario não encontrado" });
  }

  public async deleteComments(req: Request, res: Response) {
    const { id } = req.params;

    const findCommentDelete = await getRepository(Comment).findOne(id);

    if (!findCommentDelete) {
      return res.status(404).json({ mensagem: "Task não encontrada" });
    }
    getRepository(Comment).delete(id);

    return res.status(201).json(findCommentDelete);
  }
}

export default commentsController;
