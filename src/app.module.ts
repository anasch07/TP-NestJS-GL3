import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { CommonModuleModule } from './common-module/common-module.module';

@Module({
  imports: [TodoModule, CommonModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
