import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  catchError,
  Observable,
  tap,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Start Timeout interceptor');
    console.log(
      'Timeout value: ',
      typeof this.configService.get<number>('TIMEOUT'),
    );
    return next.handle().pipe(
      tap((res) => {
        console.log(this.configService.get<number>('TIMEOUT'));
      }),
      timeout(this.configService.get<number>('TIMEOUT')),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }

        return throwError(() => new Error(err));
      }),
    );
  }
}
