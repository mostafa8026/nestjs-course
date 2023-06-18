import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ApiKeyModule } from 'src/api-key/api-key.module';
import { ErrorsModule } from 'src/errors/errors.module';
import { LogErrorFilter } from 'src/global-binded/filters/log-error.filter';
import { ApiKeyGuard } from 'src/global-binded/guards/api-key.guard';

@Module({
  imports: [ErrorsModule, ApiKeyModule],
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
  ],
})
export class GlobalBindedModule {}
