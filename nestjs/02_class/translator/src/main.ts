import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  /** serve assets */
  app.useStaticAssets(join(__dirname, 'assets'));
  /** use ejs */
  app.setBaseViewsDir(join(__dirname, 'views'));
  app.setViewEngine('ejs');
  
  await app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
}
bootstrap();
