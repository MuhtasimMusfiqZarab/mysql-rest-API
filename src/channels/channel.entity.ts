import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { SeenStatus } from './channel-status.enum';
import { User } from 'src/auth/user.entity';

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

  //many to one relationship
  @ManyToOne(
    () => User,
    user => user.channels,
    { eager: false },
  )
  user: User;
}
