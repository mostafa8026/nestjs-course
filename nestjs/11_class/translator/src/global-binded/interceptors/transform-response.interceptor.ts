import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(TransformResponseInterceptor.name);
    // const request = context.switchToHttp().getRequest<Request>()
    return next.handle().pipe(
      map((response) => {
        return {
          data: response,
        };
      }),
    );
  }
}
