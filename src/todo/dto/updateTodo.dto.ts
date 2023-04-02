import { IsEnum, IsOptional, IsString } from 'class-validator';
import { statusEnum } from '../Schema/statusEnum';
import { AddTodoDto } from './addTodo.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTodoDto extends PartialType(AddTodoDto) {
  @IsOptional()
  @IsEnum(statusEnum)
  status?: statusEnum;
}
