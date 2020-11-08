import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { SeenStatus } from './channel.model';

//ENTITY naming should be in uppercase
@Entity()
export class Channel extends BaseEntity {
  //continue defining the property of a task
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: SeenStatus;
}
