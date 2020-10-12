import { Injectable } from '@nestjs/common';
import { Channel } from './channel.model';

@Injectable()
export class ChannelsService {
  private channels = [];

  getAllChannels(): Channel[] {
    return this.channels;
  }
}

//------------Nest js Porviders-----------
// Providers can be injected into the constructors if decorated as @Injectable, via dependency injection
//Providers can be a plain value, a class or sync/async factory etc
//Providers must be provided to a module for them to be usable
//Providers can be exported from a module & then be available to other modules that import it
