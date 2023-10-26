import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AppEntity } from "./app.entity";

@Entity()
export class UserEntity{
    @PrimaryGeneratedColumn('increment')
    id:number;

    @Column()
    name:string;

    @Column()
    email:string;

    @Column()
    password:string;
        
    @CreateDateColumn()
    registeredIn: Date;

    @UpdateDateColumn()
    updatedAt: Date;     

    @OneToMany(()=> AppEntity, (tasks) => tasks.user, {cascade: true})
    tasks: AppEntity[]

    constructor(name:string, email:string, password:string){
        this.name = name;
        this.email = email;
        this.password = password;
    }

}