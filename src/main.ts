import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from 'nestjs-config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
import { LoggingInterceptor } from './config/interceptors/logging.interceptor';
import * as helmet from 'helmet'
import * as rTracer from 'cls-rtracer'
import * as rateLimit from 'express-rate-limit'

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

  app.use(rTracer.expressMiddleware())
  app.use(helmet())
  const tenMinutes = 10 * 60 * 1000;
  const maxRequests = 1000;
  app.use(
    rateLimit({
      windowMs: tenMinutes,
      max: maxRequests,
      message:'⚠️ Too many request created from this IP, please try again after ten minutes'
    }),
  )
  app.useGlobalInterceptors(new LoggingInterceptor())

  await app.listen(port, () => {
    logger.log(`App is running on port: ${port as string}`)
  });
}
bootstrap();
