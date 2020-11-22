import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { hash } from "bcryptjs";
import { User } from "../entity/User";

class usersController {
  public async getUsers(req: Request, res: Response) {
    const { email } = req.body;

    console.log(email);

    if (email) {
      const findUser = await getRepository(User).findOne({
        where: { email },
      });

      if (!findUser) return res.json({ mensagem: "Usuario não encontrado" });

      const listUser = {
        id: findUser.id,
        name: findUser.name,
        lastName: findUser.lastName,
        email,
        created_at: findUser.created_at,
        updated_at: findUser.updated_at,
      };

      return res.json(listUser);
    }

    const listUsers = await getRepository(User).find();

    const users = listUsers.map((item) => {
      delete item.password;
      return item;
    });

    return res.json(users);
  }

  public async createUser(req: Request, res: Response) {
    const { email, name, lastName, password } = req.body;

    const existingEmail = await getRepository(User).findOne({
      where: { email },
    });

    if (existingEmail) return res.json({ mensagem: "E-mail já existente" });

    const hashPassword = await hash(password, 8);

    const user = getRepository(User).create({
      email,
      name,
      lastName,
      password: hashPassword,
    });

    const newUser = await getRepository(User).save(user);

    delete newUser.password;

    return res.json(newUser);
  }

  public async updateUser(req: Request, res: Response) {
    const { id } = req.params;

    const checkId = await getRepository(User).update(id, req.body);

    if (checkId.affected === 1) {
      const {
        name,
        lastName,
        email,
        created_at,
        updated_at,
      } = await getRepository(User).findOne(id);

      const updatedUser = {
        id,
        name,
        lastName,
        email,
        created_at,
        updated_at,
      };

      return res.json(updatedUser);
    }

    return res.status(404).json({ mensagem: "e-mail nao encontrado" });
  }
}

export default usersController;
