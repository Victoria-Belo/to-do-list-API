import { UserEntity } from "src/models/user.entity";
import { UserDTO } from "../dto/user.dto";


export interface UserInterface{
    findAll(): Promise<UserEntity[]>;
    findById(id:number): Promise<UserEntity>;
    update(id:number, dto:UserDTO):Promise<UserEntity>;
    delete(id:number): Promise<void>;   
}