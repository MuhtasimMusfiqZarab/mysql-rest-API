//this is the entry point of our application
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); //app module is the root module
  await app.listen(5000);
}
//bootstrap is called when new instance of nest is being  created (which is provided with a root module)
bootstrap();
