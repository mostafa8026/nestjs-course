import { PartialType } from '@nestjs/mapped-types';
import { CreateAppKeyDto } from './create-app-key.dto';

export class UpdateAppKeyDto extends PartialType(CreateAppKeyDto) {}
