import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
} from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Channel } from 'src/channels/channel.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  //here is the onetomany relationship between user and channels it has
  @OneToMany(
    () => Channel,
    channel => channel.user,
    { eager: true },
  )
  channels: Channel[];

  //we would validate the password using a custom method for user entity
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);

    return hash === this.password;
  }
}
