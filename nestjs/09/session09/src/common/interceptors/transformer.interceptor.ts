import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { classToPlain, instanceToPlain } from 'class-transformer';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((item) => {
        return instanceToPlain(item);
      }),
    );
  }
}
