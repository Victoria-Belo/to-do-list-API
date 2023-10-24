import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppEntity } from '../models/app.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppEntity])],
  controllers: [AppController],
  providers: [AppService], 
})
export class TaskModule {}
