import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, catchError, throwError, timeout } from 'rxjs';
import { TimeoutException } from 'src/shared/exceptions/timeout.exception';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(TimeoutInterceptor.name)
    return next.handle().pipe(
      timeout(5000),
      catchError(error => {
        console.log(error);
        return throwError(() => new TimeoutException('Response Timeout'));
      })
    );
  }
}
