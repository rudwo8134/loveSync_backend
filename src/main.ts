import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import * as dotenv from 'dotenv';
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  app.use(
    ['/api'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.API_USERNAME]: process.env.API_PASSWORD,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('연애 스타일 테스트 API')
    .setDescription(
      '이 API는 Eric Shin에 의해 개발되었으며, 연애 스타일 테스트를 위한 것입니다. 추가 기능이 포함될 수 있으며, 모든 저작권은 LoveSync 팀에게 있습니다.',
    )
    .setVersion('1.0')
    .addTag('questions')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
