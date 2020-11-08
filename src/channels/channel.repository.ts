//repository patern lets us abstract the database operations seperately

import { Repository, EntityRepository } from 'typeorm';
import { Channel } from './channel.entity';

//thus repository is called from the service
@EntityRepository(Channel)
export class ChannelRepository extends Repository<Channel> {}
