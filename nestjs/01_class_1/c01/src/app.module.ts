import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {PostController} from "./post/post.controller";
import {PostService} from "./post/post.service";
import {PostModule} from "./post/post.module";
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { User } from './user';
import { FileModule } from './file/file.module';

@Module({
  imports: [PostModule, UserModule, FileModule],
  controllers: [AppController],
  providers: [AppService, User],
})
export class AppModule {}
