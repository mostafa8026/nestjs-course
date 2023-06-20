import { PartialType } from '@nestjs/mapped-types';
import { CreateRequestMonitorDto } from './create-request-monitor.dto';

export class UpdateRequestMonitorDto extends PartialType(CreateRequestMonitorDto) {}
