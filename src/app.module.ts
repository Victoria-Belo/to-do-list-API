import { Module } from '@nestjs/common';
import { TaskModule } from './task.module';
import { AppEntity } from './models/app.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Module({
  imports: [TaskModule, 
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/migration/database.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
