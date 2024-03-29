import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateChannelDto } from './dto/create-channel.dto';
import { GetChannelsFilterDto } from './dto/get-channel-filter.dto';
import { ChannelRepository } from './channel.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './channel.entity';
import { SeenStatus } from './channel-status.enum';
import { User } from 'src/auth/user.entity';

//this service can be injected(via dependency injection) into constructors as decorated as @Injectable
@Injectable()
export class ChannelsService {
  //inject the channel repository
  constructor(
    @InjectRepository(ChannelRepository)
    private channelRepository: ChannelRepository,
  ) {}

  //get channels
  async getChannels(
    filterDto: GetChannelsFilterDto,
    user: User,
  ): Promise<Channel[]> {
    return this.channelRepository.getChannels(filterDto, user);
  }

  async getChannelById(id: number, user: User): Promise<Channel> {
    //find the t
    const found = await this.channelRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      //we throw an error without a catch block because nest js lets us do that without a catch block
      throw new NotFoundException(`Channel with id ${id} not found!`);
    }
    return found;
  }

  async createChannel(
    createChannelDto: CreateChannelDto,
    user: User,
  ): Promise<Channel> {
    return this.channelRepository.createChannel(createChannelDto, user);
  }

  async deleteChannel(id: number, user: User): Promise<void> {
    const result = await this.channelRepository.delete({ id, userId: user.id });

    //check if any row is deleted
    if (result.affected === 0) {
      throw new NotFoundException(`Channel with id ${id} not found!`);
    }
  }

  //update specific task status
  async updateChannelStatus(
    id: number,
    status: SeenStatus,
    user: User,
  ): Promise<Channel> {
    //retrieve the channel by id
    const channel = await this.getChannelById(id, user);

    channel.status = status;
    await channel.save();

    return channel;
  }
}

//------------Nest js Porviders-----------
// Providers can be injected into the constructors if decorated as @Injectable, via dependency injection
//Providers can be a plain value, a class or sync/async factory etc
//Providers must be provided to a module for them to be usable
//Providers can be exported from a module & then be available to other modules that import it

// -------------Services----------
//defined as providers, Not all providers are services
//Services are singleton when wrapped with @Injectable & provided to a module. Thus, the same instabce will be shared across the application acting as a single source of truth
//Servies are the main source of business logic  (For Example, Services will be called from a controller to validate a data, create an item in the DB and return a response)
