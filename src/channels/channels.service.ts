import { Injectable } from '@nestjs/common';
import { Channel } from './channel.model';

@Injectable()
export class ChannelsService {
  private channels = [];

  getAllChannels(): Channel[] {
    return this.channels;
  }
}
