import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { UserController } from './user/user.controller';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EventService } from './event/event.service';
import { EventModule } from './event/event.module';
import { UtilityService } from './utility/utility.service';
import { UtilityModule } from './utility/utility.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [
    PostModule,
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost\\sql2019',
      port: 1433,
      username: 'user1',
      password: '123',
      extra: {
        trustServerCertificate: true,
      },
      database: 'typeorm',
      synchronize: true,
      autoLoadEntities: true,
    }),
    UserModule,
    EventModule,
    UtilityModule,
    ConfigModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
