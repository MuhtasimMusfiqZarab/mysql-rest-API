import { TypeOrmModuleOptions } from '@nestjs/typeorm';

//configuration for database connection
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'vmi427508.contaboserver.net',
  port: 3306,
  username: 'root',
  password: 'H4DvVLcxW5paef',
  database: 'youtube',
  //typeorm uses entities that tranlate to table into the databse(THis entities are saved in files).THis entities array tells typeorm which files should be translated to tables
  //here any file in the source folder ended with .entity.ts will be translated to tables by typeorm
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
