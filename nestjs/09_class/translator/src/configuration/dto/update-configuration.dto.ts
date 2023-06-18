import { PartialType } from '@nestjs/mapped-types';
import { CreateConfigurationDto } from './create-configuration.dto';

export class UpdateConfigurationDto extends PartialType(CreateConfigurationDto) {}
