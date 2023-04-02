import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Version,
} from '@nestjs/common';
import { AddTodoDto } from './dto/addTodo.dto';
import { TodoService } from './todo.service';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { SearchTodoDto } from './dto/searchTodo.dto';
import { TodoEntity } from './entities/todo.entity';
import { PaginationDto } from '../utilsDTOS/PaginationDto';

// a conrtoller with prefix todo and versioning 2
@Controller({
  version: '2',
  path: 'todo',
})
export class TodoVersioningController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  //     I want to use PaginationDto and SearchTodoDto
  async findAll(@Query() queryParam: SearchTodoDto): Promise<TodoEntity[]> {
    return await this.todoService.getTodos(queryParam);
  }

  @Get(':id')
  findById(@Param('id') id: number) {
    return this.todoService.findTodoByIdDb(id);
  }

  @Post()
  async create(@Body() addTodoDto: AddTodoDto): Promise<TodoEntity> {
    return await this.todoService.createTodoWithDbV2(addTodoDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() newTodo: UpdateTodoDto) {
    return this.todoService.updateFromDb(id, newTodo);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todoService.deleteFromDb(id);
  }

  @Delete('soft/:id')
  softRemove(@Param('id') id: number) {
    return this.todoService.softDeleteDb(id);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: number) {
    return this.todoService.restoreDb(id);
  }
  @Get('/stats')
  getStatsTodoDb() {
    return this.todoService.getStats();
  }
}
