import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { ErrorsEnum } from '../../enums/ErrorsEnum';
import { statusEnum } from '../Schema/statusEnum';
import { PaginationDto } from '../../utilsDTOS/PaginationDto';

export class SearchTodoDto extends PaginationDto {
  @IsOptional()
  @IsString({
    message: ErrorsEnum.IS_STRING,
  })
  @MaxLength(10, {
    message: ErrorsEnum.MAX_LENGTH_10,
  })
  data: string;

  @IsOptional()
  @IsEnum(statusEnum)
  status?: statusEnum;
}
