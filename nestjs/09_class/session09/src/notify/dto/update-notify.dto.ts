import { PartialType } from '@nestjs/mapped-types';
import { CreateNotifyDto } from './create-notify.dto';

export class UpdateNotifyDto extends PartialType(CreateNotifyDto) {}
