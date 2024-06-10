import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'basic-auth-connect';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(
    '/dev',
    basicAuth(
      process.env.SWAGGER_USERNAME_LOGIN,
      process.env.SWAGGER_USERNAME_PASSWORD,
    ),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(process.env.APPNAME)
    .setDescription(
      `Esta é a api responsável por gerenciar a aplicação ${process.env.APPNAME}.`,
    )
    .setVersion(process.env.APPVERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('dev', app, document);
  await app.listen(
    process.env.AMBIENT === 'development' ? 3000 : process.env.PORT,
  );
}
bootstrap();
