import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppInterface } from 'src/interface/app.interface';
import { AppDTO } from 'src/interface/dto/app.dto';
import { AppEntity } from 'src/models/app.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService implements AppInterface {

  constructor(@InjectRepository(AppEntity) private appRepository : Repository<AppEntity>){}

  async findAll(): Promise<AppEntity[]> {
    return this.appRepository.find();
  }

  async findById(id: number): Promise<AppEntity | null> {
    const task = await this.appRepository.findOne({ where: { id: id } });
    if (!task) {
      throw new HttpException(`ID ${id} NOT FOUND`, HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async create(dto: AppDTO): Promise<AppEntity> {
    try {
      // padronização de status
      dto.status = dto.status === undefined ? false : dto.status;
      const taskInstance = new AppEntity(
        dto.title,
        dto.task,
        dto.author,
        dto.status,
      );
      return this.appRepository.save(taskInstance);     
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
      task.title = dto.title === undefined ? task.title : dto.title;
      task.task = dto.task === undefined ? task.task : dto.task;
      task.author = dto.author === undefined ? task.author : dto.author;
      task.status = dto.status === undefined ? task.status : dto.status;
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
