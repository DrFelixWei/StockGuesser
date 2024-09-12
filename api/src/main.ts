import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  let allowedOrigins = configService.get<string>('ALLOWED_ORIGINS').split(',');
  console.log("allowedOrigins: ", allowedOrigins);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization, Accept, X-Requested-With, X-CSRF-Token',
  });

  const port = configService.get<number>('PORT') || 3000;

  await app.listen(port, "0.0.0.0");
}
bootstrap();
