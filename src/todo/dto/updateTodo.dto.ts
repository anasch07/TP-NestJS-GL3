import {isEnum, IsNotEmpty, IsString} from 'class-validator';
import { statusEnum } from '../Schema/statusEnum';

export class UpdateTodoDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  status: statusEnum;
}
