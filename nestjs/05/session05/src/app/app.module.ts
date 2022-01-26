import { EventModule } from './../event/event.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigType } from '@nestjs/config';
import * as Joi from 'joi';
import { PostModule } from 'src/post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UtilityModule } from 'src/utility/utility.module';
import appConfig from './configs/app.config';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRootAsync({
      useFactory: (rootConfig: ConfigType<typeof appConfig>) => {
        return {
          type: 'mssql',
          host: rootConfig.database.host,
          port: +process.env.PORT,
          username: process.env.USER_NAME,
          password: process.env.PASSWORD,
          database: process.env.DATABASE,
          extra: {
            trustServerCertificate: true,
          },
          synchronize: true,
          autoLoadEntities: true,
        };
      },
      inject: [appConfig.KEY],
    }),
    ConfigModule.forRoot({
      load: [appConfig],
      envFilePath: ['.root.env', '.post.env'],
      validationSchema: Joi.object({
        HOST: Joi.string().required(),
        SHOW_MOBILE_NUMBER: Joi.boolean().optional(),
      }),
    }),
    UserModule,
    EventModule,
    UtilityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
