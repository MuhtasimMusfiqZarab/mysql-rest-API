import { Injectable } from '@nestjs/common';

@Injectable()
export class ChannelsService {
  private channels = [];

  getAllChannels(): any {
    return this.channels;
  }
}
