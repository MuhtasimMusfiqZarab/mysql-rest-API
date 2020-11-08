//repository patern lets us abstract the database operations seperately
//this is a persistance layer in the shape of a repository

import { Repository, EntityRepository } from 'typeorm';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { SeenStatus } from './channel-status.enum';

//thus repository is called from the service
@EntityRepository(Channel)
export class ChannelRepository extends Repository<Channel> {
  async createChannel(createChannelDto: CreateChannelDto): Promise<Channel> {
    //destructuring items from dto
    const { name, description } = createChannelDto;

    //create new instance of entity class
    const channel = new Channel();
    //assigning value
    channel.name = name;
    channel.description = description;
    channel.status = SeenStatus.LOCKED;
    //saving to the DB
    await channel.save();

    return channel;
  }
}
