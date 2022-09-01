import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { ConfigurationModule } from './configuration/configuration.module';

@Module({
  imports: [
    PostModule, 
    TypeOrmModule.forRoot({
      username: 'sa',
      password: '123@456dD',
      database: 'nestjs',
      type: 'mssql',
      host: 'localhost',
      synchronize: true,
      autoLoadEntities: true,
      extra: {
        encrypt: false
      }
  }), UserModule, UtilsModule, ConfigurationModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
