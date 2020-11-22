import { Task } from "./Task";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";

@Entity("User")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column({
    length: 100,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, () => User)
  task_user: Task;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
