import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";

@Entity("Task")
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  description: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user_owner: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn()
  user_selected: User;

  @OneToMany((Type) => Comment, (comment) => comment.tasks, { eager: true })
  comments: Comment[];

  @Column({ default: 1 })
  status: number;

  @Column({ default: 0 })
  estimated: string;

  @Column({ default: 0 })
  remaining: string;

  @Column({ default: 0 })
  completed: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
