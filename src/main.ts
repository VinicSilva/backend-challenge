import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from 'nestjs-config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService)
  const port = configService.get('app.port')
  const logger = new Logger()
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setVersion('1.0')
    .addTag('places')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    logger.log(`App is running on port: ${port as string}`)
  });
}
bootstrap();
