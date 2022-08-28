import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';

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
  })
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
