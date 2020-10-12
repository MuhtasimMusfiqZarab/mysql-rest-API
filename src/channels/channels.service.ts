import { Injectable } from '@nestjs/common';
import { Channel, SeenStatus } from './channel.model';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ChannelsService {
  //this array is the property of this class
  private channels: Channel[] = [];

  getAllChannels(): Channel[] {
    return this.channels;
  }

  //create a new channel for youtube
  createChannel(name: string, description: string): Channel {
    const channel: Channel = {
      id: uuidv4(),
      name,
      description,
      status: SeenStatus.LOCKED,
    };

    //push it to the task array
    this.channels.push(channel);
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
