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

  //this userId will be autometically created by typeorm, but we also need to define it in our entity definition otherwise it will be stranger to mysql
  @Column()
  userId: number;
}
