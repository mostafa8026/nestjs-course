import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/event/entities/event.entity';
import { EventModule } from 'src/event/event.module';
import { UtilityModule } from 'src/utility/utility.module';
import { UtilityService } from 'src/utility/utility.service';
import postConfig from './configs/post.config';
import { CURRENCY_SIGN } from './constants/token.constant';
import { CategoryEntity } from './entities/category.entity';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    ConfigModule.forFeature(postConfig),
    TypeOrmModule.forFeature([PostEntity, CategoryEntity, EventEntity]),
    EventModule,
    UtilityModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    {
      provide: 'MAIL_API',
      useValue: 'http://mail.google.com',
    },
    {
      provide: CURRENCY_SIGN,
      useFactory: async (
        utilityService: UtilityService,
        configService: ConfigService,
      ) => {
        const config = await configService.get<string>('CURRENCY');
        return utilityService.getCurrencySign(config);
      },
      inject: [UtilityService, ConfigService],
    },
  ],
})
export class PostModule {}
