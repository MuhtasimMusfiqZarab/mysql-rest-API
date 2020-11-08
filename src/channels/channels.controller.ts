// controller is responsible to handling incoming requests & return response to the client
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { GetChannelsFilterDto } from './dto/get-channel-filter.dto';
import { ChannelStatusValidationPipe } from './pipes/channel-status-validation.pipe';
import { Channel } from './channel.entity';

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
  // @Get()
  // getChannels(
  //   @Query(ValidationPipe) filterDto: GetChannelsFilterDto,
  // ): Channel[] {
  //   //check if query parameters have value in them & based on that execute the service
  //   if (Object.keys(filterDto).length) {
  //     return this.channelsService.getChannelsWithFilters(filterDto);
  //   }
  //   //else return all the channels
  //   return this.channelsService.getAllChannels();
  // }

  //get task by id
  @Get('/:id')
  //parseInt pipe to validate if we are getting a number at run time
  getChannelById(@Param('id', ParseIntPipe) id: number): Promise<Channel> {
    return this.channelsService.getChannelById(id);
  }

  //create a new task
  @Post()
  //we need to use validation pipe so that empty name & description is not provided
  @UsePipes(ValidationPipe)
  createChannel(@Body() createChannelDto: CreateChannelDto): Promise<Channel> {
    return this.channelsService.createChannel(createChannelDto);
  }

  // @Delete('/:id')
  // deleteChannel(@Param('id') id: string): void {
  //   this.channelsService.deleteChannel(id);
  // }

  // @Patch('/:id/status')
  // updateChannelStatus(
  //   @Param('id') id: string,
  //   //for validation we can provide 2nd parameter to the Body decorator
  //   @Body('status', ChannelStatusValidationPipe) status: SeenStatus,
  // ): Channel {
  //   return this.channelsService.updateChannelStatus(id, status);
  // }
}

//---------------------ALL ABOUT CONTROLLERS-------------------

//-------Dependency injection in Nest js--------
// Any component within the nest js ecosystem can inject a provider that is decorated with @Injectable if that is in the same module
//We define the dependencies in the constructor of the class, then it will be available as the class property (Nest js does that for us)
