import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { UserModule } from './user/user.module';
import { UtilsModule } from './utils/utils.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { appConfig } from './app.config';
import typeormConfig from './typeorm.config';

@Module({
  imports: [
    PostModule, 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(typeormConfig)],
      inject: [typeormConfig.KEY],
      useFactory: (typeormConfigService: ConfigType<typeof typeormConfig>) => {
        return {
          username: 'sa',
          password: '123@456dD',
          database: typeormConfigService.database,
          type: 'mssql',
          host: 'localhost',
          synchronize: true,
          autoLoadEntities: true,
          extra: {
            encrypt: false
          }
      }
    }
  }), UserModule, UtilsModule, ConfigurationModule,
  ConfigModule.forRoot(),
  ConfigModule.forFeature(appConfig)
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
