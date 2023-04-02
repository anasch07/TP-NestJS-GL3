import {
  ConflictException,
  Delete,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Todo } from './Schema/todo.schema';
import { AddTodoDto } from './dto/addTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { statusEnum } from './Schema/statusEnum';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from './entities/todo.entity';
import { SearchTodoDto } from './dto/searchTodo.dto';
import { PaginationDto } from '../utilsDTOS/PaginationDto';

class APIfeatures {
  constructor(
    public query: SelectQueryBuilder<TodoEntity>,
    private queryString: PaginationDto,
  ) {}

  paginating() {
    const page = this.queryString.page || 1;
    const limit = this.queryString.limit || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.offset(skip).limit(limit);
    return this;
  }
}

@Injectable()
export class TodoService {
  @Inject('UUID') uuid: () => number;

  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  todos: Todo[] = [];

  async getTodos({ data, status, page, limit }: SearchTodoDto) {
    const qb = this.todoRepository.createQueryBuilder('todo');
    const pagination = { page, limit };
    if (data) {
      // look if data is found in name or description
      qb.where('todo.name LIKE :data', { data: `%${data}%` }).orWhere(
        'todo.description LIKE :data',
        { data: `%${data}%` },
      );
    }
    if (status) {
      qb.andWhere('todo.status = :status', { status });
    }
    const feature = new APIfeatures(qb, pagination).paginating();
    return await feature.query.getMany();
  }

  findAll(): Todo[] {
    return this.todos;
  }

  createV1(todo: AddTodoDto): Todo {
    const newTodo: Todo = {
      id: this.uuid(),
      name: todo.name,
      description: todo.description,
      createdAt: new Date(),
      status: statusEnum.EnAttente,
    };
    this.todos.push(newTodo);
    return this.todos[this.todos.length - 1];
  }

  async createTodoWithDbV2(todo: AddTodoDto): Promise<TodoEntity> {
    const newTodo = this.todoRepository.create(todo);
    try {
      return await this.todoRepository.save(newTodo);
    } catch (e) {
      throw new ConflictException(e.message);
    }
  }

  findOne(id: number) {
    const todo = this.findTodo(id);
    return todo;
  }

  remove(id: number) {
    const todo = this.findTodo(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return todo;
  }

  update(id: number, newTodo: UpdateTodoDto) {
    const todo = this.findTodo(id);
    const index = this.todos.findIndex((todo) => todo.id === id);
    this.todos[index] = { ...todo, ...newTodo };
    return this.todos[index];
  }

  async updateFromDb(id: number, newTodo: UpdateTodoDto) {
    const foundedTodo = await this.findTodoByIdDb(id);

    const updatedTodo = await this.todoRepository.save({
      ...foundedTodo,
      ...newTodo,
    });
    return updatedTodo;
  }

  async deleteFromDb(id: number) {
    const foundedTodo = await this.findTodoByIdDb(id);
    await this.todoRepository.delete(foundedTodo.id);
    return foundedTodo;
  }

  async softDeleteDb(id: number) {
    const foundedTodo = await this.findTodoByIdDb(id);
    await this.todoRepository.softDelete(foundedTodo.id);
    return foundedTodo;
  }

  async restoreDb(id: number) {
    return await this.todoRepository.restore(id);
  }

  findTodo(id: number): any {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }

  async findTodoByIdDb(id: number): Promise<TodoEntity> {
    const foundedTodo = await this.todoRepository.findOneBy({ id });
    if (!foundedTodo) {
      throw new NotFoundException(`Todo with id ${id} not found`);
    }
    return foundedTodo;
  }

  async getStats() {
    return {
      waiting: await this.todoRepository.countBy({
        status: statusEnum.EnAttente,
      }),
      done: await this.todoRepository.countBy({ status: statusEnum.Finalise }),
      ongoing: await this.todoRepository.countBy({
        status: statusEnum.EnCours,
      }),
    };
  }
}
