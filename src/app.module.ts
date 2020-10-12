//this is the root module which is nest js module
import { Module } from '@nestjs/common';
import { ChannelsModule } from './channels/channels.module';

@Module({
  //importing all the separate modules here
  imports: [ChannelsModule],
})
export class AppModule {}

// a module is defined by annotation a class with @module decorator
//decorators provides metadata that nest js uses to organize the application structure
