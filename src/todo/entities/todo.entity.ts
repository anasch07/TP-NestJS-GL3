import { statusEnum } from '../Schema/statusEnum';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntites } from '../../../Generics/timestamp.entites.';

@Entity('todo')
export class TodoEntity extends TimestampEntites {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: statusEnum,
    default: statusEnum.EnAttente,
  })
  status: string;
}
