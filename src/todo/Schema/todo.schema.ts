import { statusEnum } from './statusEnum';

export class Todo {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  status: statusEnum;

}
