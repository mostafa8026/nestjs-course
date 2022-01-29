import { Module } from '@nestjs/common';
import { TextfieldsService } from './textfields.service';
import { TextfieldsController } from './textfields.controller';
import { TranslateModule } from 'src/translate/translate.module';

@Module({
  imports: [TranslateModule],
  controllers: [TextfieldsController],
  providers: [TextfieldsService],
})
export class TextfieldsModule {}
