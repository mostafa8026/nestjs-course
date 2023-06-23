import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ErrorEntity } from 'src/errors/entities/error.entity';
import { ErrorsController } from './errors.controller';
import { ErrorsService } from './errors.service';

@Module({
  imports: [TypeOrmModule.forFeature([ErrorEntity])],
  controllers: [ErrorsController],
  providers: [ErrorsService],
  exports: [ErrorsService],
})
export class ErrorsModule {}
