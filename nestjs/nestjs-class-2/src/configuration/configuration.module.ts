import { Module } from '@nestjs/common';
import { ConfigurationService } from './configuration.service';
import { ConfigurationController } from './configuration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigurationRepository } from './repositories/configuration.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ConfigurationRepository])],
  controllers: [ConfigurationController],
  providers: [ConfigurationService],
  exports: [ConfigurationService]
})
export class ConfigurationModule { }
