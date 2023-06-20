import { PartialType } from '@nestjs/mapped-types';
import { CreateApiKeyDto } from './create-api-key.dto';

export class UpdateApiKeyDto extends PartialType(CreateApiKeyDto) {}
