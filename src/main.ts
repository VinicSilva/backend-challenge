import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from 'nestjs-config'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService)
  const port = configService.get('app.port')
  await app.listen(port, () => {
    console.log(`App is running on: ${port as string}`)
  })
}
bootstrap();
