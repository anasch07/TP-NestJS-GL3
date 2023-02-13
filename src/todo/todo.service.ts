import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './Schema/todo.schema';
import { AddTodoDto } from './dto/addTodo.dto';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { statusEnum } from './Schema/statusEnum';

@Injectable()
export class TodoService {
  @Inject('UUID') uuid: () => number;
  todos: Todo[] = [];

  findAll(): Todo[] {
    return this.todos;
  }

  create(todo: AddTodoDto): Todo {
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

  findTodo(id: number): any {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return new NotFoundException(`Todo with id ${id} not found`);
    }
    return todo;
  }
}
