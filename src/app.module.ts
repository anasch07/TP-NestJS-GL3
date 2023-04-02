import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommonModuleModule } from './common-module/common-module.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TodoModule,
    CommonModuleModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'tp2nest27022023',
      autoLoadEntities: true,
      synchronize: true,
      debug: false,
      // logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
