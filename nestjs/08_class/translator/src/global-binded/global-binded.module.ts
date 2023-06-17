import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { ErrorsModule } from 'src/errors/errors.module';
import { LogErrorFilter } from 'src/global-binded/filters/log-error.filter';

@Module({
  imports: [ErrorsModule],
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
  ],
})
export class GlobalBindedModule {}
