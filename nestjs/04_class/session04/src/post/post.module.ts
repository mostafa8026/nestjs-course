import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { EventEntity } from 'src/event/entities/event.entity';
import { EventModule } from 'src/event/event.module';
import { UtilityModule } from 'src/utility/utility.module';
import { UtilityService } from 'src/utility/utility.service';
import { CURRENCY_SIGN } from './constants/token.constant';
import { CategoryEntity } from './entities/category.entity';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity, CategoryEntity, EventEntity]),
    EventModule,
    UtilityModule,
    ConfigModule
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
      useFactory: async (utilityService: UtilityService, configService: ConfigService) => {
        const config = await configService.getCurrencyValue();
        return utilityService.getCurrencySign(config.value);
      },
      inject: [UtilityService, ConfigService],
    },
  ],
})
export class PostModule {}
