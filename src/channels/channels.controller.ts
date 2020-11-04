// controller is responsible to handling incoming requests & return response to the client
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { Channel } from './channel.model';
import { CreateChannelDto } from './dto/create-channel.dto';

//controllers are bound by a specific path ('/channel' for channel resource )
// controller take advantage of ependency injection to consume providers within the same module
//controllers are defined using @Controller decorator, this decorator accepts a string which is the path to be handled by the controller
@Controller('channels')
export class ChannelsController {
  //we define the dependencies in the constructor of the class, nest js  will take care of the injection and it will be available as class property
  constructor(private channelsService: ChannelsService) {}

  //controller contains handlers , which handles endpoints & Request methods (GET,POST..etc)
  //handlers are simply methods (GET,POST, DELETE) within the controller class, decoated with decorators(@Get,@Post etc)
  //handlers  returns a response value as an HTTP response & return it to the client
  @Get()
  getAllChannels(): Channel[] {
    return this.channelsService.getAllChannels();
  }

  @Post()
  createChannel(@Body() createChannelDto: CreateChannelDto): Channel {
    return this.channelsService.createChannel(createChannelDto);
  }
}

//---------------------ALL ABOUT CONTROLLERS-------------------

//-------Dependency injection in Nest js--------
// Any component within the nest js ecosystem can inject a provider that is decorated with @Injectable if that is in the same module
//We define the dependencies in the constructor of the class, then it will be available as the class property (Nest js does that for us)
