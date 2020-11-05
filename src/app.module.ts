//this is the root module which is nest js module
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChannelsModule } from './channels/channels.module';

@Module({
  //importing all the separate modules here
  imports: [
    ChannelsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'vmi427508.contaboserver.net',
      port: 3306,
      username: 'root',
      password: 'H4DvVLcxW5paef',
      database: 'youtube',
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule {}

// a module is defined by annotation a class with @module decorator
//decorators provides metadata that nest js uses to organize the application structure

///---------------Property inside a module-----------------
// providers: array of providers to be available within the module via dependency injection
// controllers: Array of controllers to be instantiated  within the module
//exports: array of providers to export to other moduels
//imports: List of modules required by this modules. Any exported provider by these moduels will now be available in our module by dependency injection.
//
