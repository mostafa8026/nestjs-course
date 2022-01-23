import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';
import { UserController } from './user/user.controller';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
