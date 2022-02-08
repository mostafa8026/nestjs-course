import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { classToPlain, instanceToPlain } from 'class-transformer';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class WrapperResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(`Start interceptr`);
    return next.handle().pipe(
      map((data) => {
        console.log('wrapper map');
        return { data: instanceToPlain(data) };
      }),
    );
  }
}
