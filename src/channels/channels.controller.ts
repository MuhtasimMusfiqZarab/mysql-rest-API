import { Controller, Get } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { Channel } from './channel.model';

@Controller('channels')
export class ChannelsController {
  constructor(private channelsService: ChannelsService) {}

  @Get()
  getAllChannels(): Channel[] {
    return this.channelsService.getAllChannels();
  }
}
