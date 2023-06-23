import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('AI Translator').setVersion('0.0.1').build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api-doc', app, document);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  await app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
  });
}
bootstrap();
