import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppInterface } from 'src/interface/app.interface';
import { AppDTO } from 'src/dto/app.dto';
import { AppEntity } from 'src/models/app.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/models/user.entity';

@Injectable()
export class AppService implements AppInterface {

  constructor(@InjectRepository(AppEntity) private appRepository : Repository<AppEntity>,
  @InjectRepository(UserEntity) private userRepository : Repository<UserEntity>){}

  async findAll(idUser:number): Promise<AppEntity[]> {
    return this.appRepository.find({where: {userId: idUser}});
  }

  async findById(id: number): Promise<AppEntity | null> {
    const task = await this.appRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new HttpException(`ID ${id} NOT FOUND`, HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async create(dto: AppDTO, idUser: number): Promise<any> {
    try {
      const user = await this.userRepository.find({where: {id: idUser}, relations: {
        tasks: true,
      }});       
     
      dto.status = dto.status ?? false;
      dto.author = user[0].name;
      
      const taskInstance = new AppEntity(
        dto.title,
        dto.task,
        dto.author,
        dto.status       
      );
      
      taskInstance.user = user[0];      
      taskInstance.userId = user[0].id;
      await this.appRepository.save(taskInstance);      
  
      user[0].tasks.push(taskInstance);
      await this.userRepository.save(user);
      
      return {
        id: taskInstance.id,
        title: dto.title,
        task: dto.task,
        author: dto.author,
        status: dto.status,
        user: {
          userId: user[0].id,
          name: user[0].name,
          email: user[0].email,
        },
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(`${error} `, HttpStatus.BAD_REQUEST);
    }
  }
  

  async update(id: number, dto: AppDTO): Promise<AppEntity> {    
    const task = await this.appRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new HttpException(`ID ${id} NOT FOUND`, HttpStatus.NOT_FOUND);
    }    
    try {
      task.title = dto.title ?? task.title;
      task.task = dto.task ?? task.task ;   
      task.status = dto.status ?? task.status;
      return await this.appRepository.save(task);        
    } catch (error) {      
          throw new HttpException(`${error} `, HttpStatus.BAD_REQUEST);       
    }
  }

  async delete(id: number): Promise<void> {
    const task = await this.appRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new HttpException(`ID ${id} NOT FOUND`, HttpStatus.NOT_FOUND);
    }
    try {
      //obs: checar linhas afetadas, ele vira um obj com uma propriedade affected
      await this.appRepository.delete(id);      
    } catch (error) {
      console.error(error);
      throw new HttpException(`${error} `, HttpStatus.INTERNAL_SERVER_ERROR);
    }       
    throw new HttpException('', HttpStatus.NO_CONTENT);
  }

  getHello(): string {
    return 'Hello World!';
  }
}
