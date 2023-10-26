import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppEntity } from '../models/app.entity';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AppEntity, UserEntity])],
  controllers: [AppController],
  providers: [AppService, JwtService], 
})
export class TaskModule {}
