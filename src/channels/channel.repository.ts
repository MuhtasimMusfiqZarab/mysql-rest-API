//repository patern lets us abstract the database operations seperately
//this is a persistance layer in the shape of a repository

import { Repository, EntityRepository } from 'typeorm';
import { Channel } from './channel.entity';
import { CreateChannelDto } from './dto/create-channel.dto';
import { SeenStatus } from './channel-status.enum';
import { GetChannelsFilterDto } from './dto/get-channel-filter.dto';
import { User } from 'src/auth/user.entity';

//thus repository is called from the service
@EntityRepository(Channel)
export class ChannelRepository extends Repository<Channel> {
  //get all the channels from DB
  async getChannels(filterDto: GetChannelsFilterDto): Promise<Channel[]> {
    const { status, search } = filterDto;

    //we will be using query builder for filtering and getting the data(query builder is a method of repository)
    const query = this.createQueryBuilder('channel'); //coz channel is the table

    //we want to support both of the filtering.. so we are using andWhere or we would use where only if there is one single filter to apply
    if (status) {
      //here it provides where clause of the SQL query
      query.andWhere('channel.status = :status', { status });
    }

    if (search) {
      // we are using like because we want partial search
      //% is used for partial search or substring
      query.andWhere(
        '(channel.name LIKE :search OR channel.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const channels = await query.getMany();
    return channels;
  }

  //create a new channel in the DB
  async createChannel(
    createChannelDto: CreateChannelDto,
    user: User,
  ): Promise<Channel> {
    //destructuring items from dto
    const { name, description } = createChannelDto;

    //create new instance of entity class
    const channel = new Channel();
    //assigning value
    channel.name = name;
    channel.description = description;
    channel.status = SeenStatus.LOCKED;

    //assigning the channel to user
    channel.user = user;

    //saving to the DB
    await channel.save();

    //delete the user from the response before sending it to the client
    delete channel.user;

    return channel;
  }
}
