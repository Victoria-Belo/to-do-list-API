import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TaskModule } from './task.module';
import { UserModule } from './user.module';

@Module({
  imports: [UserModule, TaskModule,
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
