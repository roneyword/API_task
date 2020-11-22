import { getRepository, createQueryBuilder } from "typeorm";
import { Request, Response } from "express";
import { Task } from "./../entity/Task";
import { User } from "./../entity/User";
import { Comment } from "./../entity/Comment";

class tasksController {
  public async createTask(req: Request, res: Response) {
    const { title, description, selected_user } = req.body;

    if (title.trim() == "" || description.trim() == "") {
      return res.status(404).json({ mensagem: "campos obrigatorios vazios" });
    }

    if (selected_user) {
      const verifySelectUser = await getRepository(User).findOne({
        where: {
          email: selected_user,
        },
      });

      if (!verifySelectUser) {
        return res.status(404).json({ mensagem: "Usuario não encontrado" });
      }
    }

    const newTask = await getRepository(Task).save(req.body);

    return res.json(newTask);
  }

  public async listTask(req: Request, res: Response) {
    const { id } = req.body;

    if (id) {
      const listTaskId = await getRepository(Task).findOne({
        where: { id },
      });

      if (!listTaskId) return res.json({ mensagem: "Task não encontrada" });

      delete listTaskId.user_owner.password;
      delete listTaskId.user_selected.password;

      return res.json(listTaskId);
    }

    const listTask = await getRepository(Task).find();

    const newListTask = listTask.map((item) => {
      if (item.user_owner || item.user_selected) {
        delete item.user_owner.password;
        delete item.user_selected.password;
      }
      return item;
    });

    return res.json(newListTask);
  }

  public async updateTask(req: Request, res: Response) {
    const { id } = req.params;

    const checkId = await getRepository(Task).update(id, req.body);

    if (checkId.affected === 1) {
      const updatedTask = await getRepository(Task).findOne(id);
      return res.json(updatedTask);
    }

    return res.status(404).json({ mensagem: "task não encontrado" });
  }

  public async deleteTask(req: Request, res: Response) {
    const { id } = req.params;

    const findTaskDelete = await getRepository(Task).findOne(id);

    if (!findTaskDelete) {
      return res.status(404).json({ mensagem: "Task não encontrada" });
    }
    getRepository(Task).delete(id);

    return res.status(201).json(findTaskDelete);
  }
}

export default tasksController;
