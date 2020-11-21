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
  UseGuards,
} from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { SeenStatus } from './channel-status.enum';
import { CreateChannelDto } from './dto/create-channel.dto';
import { GetChannelsFilterDto } from './dto/get-channel-filter.dto';
import { ChannelStatusValidationPipe } from './pipes/channel-status-validation.pipe';
import { Channel } from './channel.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

//controllers are bound by a specific path ('/channel' for channel resource )
// controller take advantage of ependency injection to consume providers within the same module
//controllers are defined using @Controller decorator, this decorator accepts a string which is the path to be handled by the controller
@Controller('channels')
@UseGuards(AuthGuard())
export class ChannelsController {
  //we define the dependencies in the constructor of the class, nest js  will take care of the injection and it will be available as class property
  constructor(private channelsService: ChannelsService) {}

  //controller contains handlers , which handles endpoints & Request methods (GET,POST..etc)
  //handlers are simply methods (GET,POST, DELETE) within the controller class, decoated with decorators(@Get,@Post etc)
  //handlers  returns a response value as an HTTP response & return it to the client
  @Get()
  getChannels(
    @Query(ValidationPipe) filterDto: GetChannelsFilterDto,
    @GetUser() user: User,
  ): Promise<Channel[]> {
    return this.channelsService.getChannels(filterDto, user);
  }

  //get task by id
  @Get('/:id')
  //parseInt pipe to validate if we are getting a number at run time
  getChannelById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Channel> {
    return this.channelsService.getChannelById(id, user);
  }

  //create a new task
  @Post()
  //we need to use validation pipe so that empty name & description is not provided
  @UsePipes(ValidationPipe)
  createChannel(
    @Body() createChannelDto: CreateChannelDto,
    @GetUser() user: User,
  ): Promise<Channel> {
    return this.channelsService.createChannel(createChannelDto, user);
  }

  @Delete('/:id')
  deleteChannel(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.channelsService.deleteChannel(id, user);
  }

  @Patch('/:id/status')
  updateChannelStatus(
    @Param('id', ParseIntPipe) id: number,
    //for validation we can provide 2nd parameter to the Body decorator
    @Body('status', ChannelStatusValidationPipe) status: SeenStatus,
    @GetUser() user: User,
  ): Promise<Channel> {
    return this.channelsService.updateChannelStatus(id, status, user);
  }
}

//---------------------ALL ABOUT CONTROLLERS-------------------

//-------Dependency injection in Nest js--------
// Any component within the nest js ecosystem can inject a provider that is decorated with @Injectable if that is in the same module
//We define the dependencies in the constructor of the class, then it will be available as the class property (Nest js does that for us)
