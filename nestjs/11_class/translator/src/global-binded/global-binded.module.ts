import { MiddlewareConsumer, Module, NestModule, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ApiKeyModule } from 'src/api-key/api-key.module';
import { ErrorsModule } from 'src/errors/errors.module';
import { LogErrorFilter } from 'src/global-binded/filters/log-error.filter';
import { ApiKeyGuard } from 'src/global-binded/guards/api-key.guard';
import { TimeoutInterceptor } from 'src/global-binded/interceptors/timeout.interceptor';
import { TransformResponseInterceptor } from 'src/global-binded/interceptors/transform-response.interceptor';
import { RequestMonitorMiddleware } from 'src/global-binded/middlewares/request-monitor.middleware';
import { RequestMonitorModule } from 'src/request-monitor/request-monitor.module';

@Module({
  imports: [ErrorsModule, ApiKeyModule, RequestMonitorModule],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    },
    {
      provide: APP_FILTER,
      useClass: LogErrorFilter,
    },
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor
    }
  ],
})
export class GlobalBindedModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestMonitorMiddleware).forRoutes('*')
  }

}
