import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TaskModule } from './modules/task.module';
import { UserModule } from './modules/user.module';
import { AuthModule } from './modules/jwt.module';

@Module({
  imports: [UserModule, TaskModule, AuthModule,
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
