import { Module } from '@nestjs/common';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelRepository } from './channel.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  //import TYpeORM module for channel as it contains code where TypeORM is used for DB data manupulation
  //here we are alse including ChannelRepository instance inside forFeature ... Calling it automatically creates instance.
  //This also lets us TYpeORM module which comes from nest js include ChannelRepository instance injectable in dependency injection throughout the module
  imports: [TypeOrmModule.forFeature([ChannelRepository]), AuthModule],
  controllers: [ChannelsController],
  providers: [ChannelsService],
})
export class ChannelsModule {}
