import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDTO } from "src/dto/user.dto";
import { UserInterface } from "src/interface/user.interface";
import { AuthInterface } from "src/interface/auth.interface";
import { UserEntity } from "src/models/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService implements UserInterface , AuthInterface {

    constructor(@InjectRepository(UserEntity) private userRepository : Repository<UserEntity>){}

    // Auth Interface
    
    async login(credential: any): Promise<any> {    
        const user = await this.userRepository.findOne({where:{ email: credential.email}});        
        const pass = await this.unhashing(credential.password, user.password);
        console.log('resultado User :', user, '\npass unhashing: ', pass);
        if(!user || !pass){
            throw new HttpException(`Invalid credentials. Please, try again.`, HttpStatus.BAD_REQUEST);
        }
        // preciso enviar um token de validação!
        return 'TU TÁ ON, DEV :D!';        
    }   

    async hashing(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }
 
    async unhashing(key: string, hash: string): Promise<boolean> {
        return bcrypt.compare(key, hash);
    }

    async register(dto: UserDTO): Promise<UserEntity> {        
        const checkingDuplicateEmail = await this.userRepository.findOne({where: { email: dto.email}});       
        if(checkingDuplicateEmail){
            throw new HttpException(`Email already in use!`, HttpStatus.BAD_REQUEST);
        }               
        try {
            const hashingPassword = await this.hashing(dto.password); 
            const userInstance = new UserEntity(dto.name, dto.email, hashingPassword);
            return await this.userRepository.save(userInstance);
        } catch (error) {
                console.error(error);
                throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    // User Interface

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async findById(id: number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({where: {id: id}});
        if(!user){
            throw new HttpException(`ID ${id} NOT FOUND`, HttpStatus.NOT_FOUND);
        }
        return user;    
    }  

    async update(id: number, dto: UserDTO): Promise<UserEntity> {       
        const user = await this.userRepository.findOne({where:{id:id}});
        if(!user){
            throw new HttpException(`ID ${id} NOT FOUND`, HttpStatus.NOT_FOUND);
        }
        let pass = user.password;;
        if(dto.password){
            pass = await this.hashing(dto.password);
        }
        user.name = dto.name ?? user.name;
        user.email = dto.email ?? user.email;
        user.password = pass;        
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            console.error(error);
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
        }
    }

    async delete(id: number): Promise<void> {
        const user = await this.userRepository.findOne({where:{id:id}});
        if(!user){
            throw new HttpException(`ID ${id} NOT FOUND`, HttpStatus.NOT_FOUND);
        }
        try {
            await this.userRepository.delete(id); 
        } catch (error) {
            console.error(error);
            throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('', HttpStatus.NO_CONTENT);
    }    
    
}