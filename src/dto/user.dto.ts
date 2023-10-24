import { IsEmail, IsNotEmpty } from "class-validator";

export class UserDTO{

    @IsNotEmpty()
    name:string;

    @IsEmail()
    email:string;

    @IsNotEmpty()
    password:string;
    
}