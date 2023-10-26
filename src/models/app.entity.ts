import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class AppEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  task: string;

  @Column()
  author: string;

  @Column()
  status: boolean;

  @CreateDateColumn()
  registeredIn: Date;

  @UpdateDateColumn()
  updatedAt: Date; 

  @ManyToOne(() => UserEntity, (user)=> user.tasks)
  user : UserEntity;
 
  constructor(title: string, task: string, author: string, status: boolean) {   
    this.title = title;
    this.task = task;
    this.author = author;
    this.status = status;  
  }

}
