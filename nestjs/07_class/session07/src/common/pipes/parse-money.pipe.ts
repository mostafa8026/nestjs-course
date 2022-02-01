import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseMoneyPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    let currencySigns: string[] = ['$', '^', 'ریال'];
    console.log(value);
    let isSignAccepted = false;
    for (var i = 0; i < currencySigns.length; i++) {
      isSignAccepted = value.endsWith(currencySigns[i]);
      console.log('isSignAccepted: ', isSignAccepted);
      if (isSignAccepted) break;
    }

    console.log('after foreach isSignAccepted', isSignAccepted);

    if (!isSignAccepted) {
      throw new BadRequestException(
        `Your currency does not end with an acceptable sign`,
      );
    }

    currencySigns.forEach((item) => {
      value = value.replace(item, '');
    });

    console.log('after foreach sign', value);

    value = value.replace(/,/g, '');

    console.log('after foreach sign', value);

    return parseInt(value);
  }
}
