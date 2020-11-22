import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../config/auth";
import { User } from "../entity/User";

class sessionsController {
  public async authUser(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await getRepository(User).findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ mensagem: "email/senha invalido" });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ mensagem: "email/senha invalido" });
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ id: user.id }, secret, {
      expiresIn: expiresIn,
    });

    delete user.password;

    return res.json({ user, token });
  }
}

export default sessionsController;
