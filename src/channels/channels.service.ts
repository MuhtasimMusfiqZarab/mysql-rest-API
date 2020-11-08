import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateChannelDto } from './dto/create-channel.dto';
import { GetChannelsFilterDto } from './dto/get-channel-filter.dto';
import { ChannelRepository } from './channel.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Channel } from './channel.entity';

//this service can be injected(via dependency injection) into constructors as decorated as @Injectable
@Injectable()
export class ChannelsService {
  //inject the channel repository
  constructor(
    @InjectRepository(ChannelRepository)
    private channelRepository: ChannelRepository,
  ) {}

  // //return all the channels in the memory
  // getAllChannels(): Channel[] {
  //   return this.channels;
  // }
  // //get channels with filters using query params
  // getChannelsWithFilters(filterDto: GetChannelsFilterDto): Channel[] {
  //   //destruct the filter dto
  //   const { status, search } = filterDto;
  //   let channels = this.getAllChannels();
  //   if (status) {
  //     channels = channels.filter(channel => channel.status === status);
  //   }
  //   if (search) {
  //     channels = channels.filter(
  //       channel =>
  //         channel.name.toLowerCase().includes(search.toLowerCase()) ||
  //         channel.description.toLowerCase().includes(search.toLowerCase()),
  //     );
  //   }
  //   return channels;
  // }

  async getChannelById(id: number): Promise<Channel> {
    //find the t
    const found = await this.channelRepository.findOne(id);
    if (!found) {
      //we throw an error without a catch block because nest js lets us do that without a catch block
      throw new NotFoundException(`Channel with id ${id} not found!`);
    }
    return found;
  }

  // //create a new channel for youtube
  // createChannel(createChannelDto: CreateChannelDto): Channel {
  //   //destructuring items from dto
  //   const { name, description } = createChannelDto;
  //   const channel: Channel = {
  //     id: uuidv4(),
  //     name,
  //     description,
  //     status: SeenStatus.LOCKED,
  //   };
  //   //push it to the task array
  //   this.channels.push(channel);
  //   //good practice to always return a newly created resourse
  //   return channel;
  // }
  // //delete a single channel by id
  // deleteChannel(id: string): void {
  //   //search for the channel with id if exists(used for handling not found exception)
  //   const found = this.getChannelById(id);
  //   this.channels = this.channels.filter(task => task.id !== found.id);
  // }
  // //update specific task status
  // updateChannelStatus(id: string, status: SeenStatus): Channel {
  //   //retrieve the channel by id
  //   const channel = this.getChannelById(id);
  //   channel.status = status;
  //   return channel;
  // }
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
