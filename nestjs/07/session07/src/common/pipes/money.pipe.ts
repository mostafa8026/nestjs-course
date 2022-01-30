import {
  ArgumentMetadata,
  Injectable,
  ParseIntPipe,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class MoneyPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const val = value.replace(',', '');
    return parseInt(val);
  }
}
