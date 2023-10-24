import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
 
  constructor(title: string, task: string, author: string, status: boolean) {
    this.id;
    this.title = title;
    this.task = task;
    this.author = author;
    this.status = status;
  }

}
