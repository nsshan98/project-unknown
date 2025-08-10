import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseThenValidatePipe } from './common/pipes/parse-json-fields.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ParseThenValidatePipe(['amenity']));

  await app.listen(process.env.PORT ?? 5000);
  
}
bootstrap();
