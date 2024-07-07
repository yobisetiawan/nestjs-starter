import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  //Enable Log
  app.useLogger(app.get(Logger));

  //SET 50mb size body request
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
    }),
  );

  //SET Doc OPEN API Swagger
  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth()
    // .addBasicAuth(
    //   {
    //     type: 'http',
    //     scheme: 'basic',
    //   },
    //   'basic-auth',
    // )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/docs', app, document);

  //SET PORT
  const configService = app.get(ConfigService);
  const port = configService.get('app.port');

  await app.listen(port);

  //LOG APP RUN ON PORT
  const server = app.getHttpServer();
  const address = server.address();
  const host = address.address === '::' ? 'http://localhost' : address.address;

  logger.log(`Application is running on: ${host}:${port}`);
}
bootstrap();
