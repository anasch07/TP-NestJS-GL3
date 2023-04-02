import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Version,
} from '@nestjs/common';
import { Todo } from './Schema/todo.schema';
import { AddTodoDto } from './dto/addTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { TodoService } from './todo.service';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Post()
  async create(@Body() todo: AddTodoDto): Promise<Todo> {
    return this.todoService.createV1(todo);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Todo {
    return <Todo>this.todoService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Todo {
    return <Todo>this.todoService.remove(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() newTodo: UpdateTodoDto): Todo {
    return <Todo>this.todoService.update(id, newTodo);
  }
}
