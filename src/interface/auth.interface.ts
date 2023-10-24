import { UserEntity } from "src/models/user.entity";
import { UserDTO } from "../dto/user.dto";


export interface AuthInterface{
    login(credential: any): any;
    register(dto:UserDTO): Promise<UserEntity>;
    update(id:number, dto:UserDTO):Promise<UserEntity>;   
    hashing(password:string):Promise<string>;
    unhashing(key: string, hash: string):Promise<boolean>;
}