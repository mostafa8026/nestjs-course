import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { CreateErrorDto } from 'src/errors/dto/create-error.dto';
import { ErrorsService } from 'src/errors/errors.service';

@Catch(HttpException)
export class LogErrorFilter implements ExceptionFilter {
  constructor(private readonly _errorService: ErrorsService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();

    const response = context.getResponse();
    const exceptionResponse = exception.getResponse();

    const errorDto = new CreateErrorDto();
    console.log(exceptionResponse);
    errorDto.message = JSON.stringify(exceptionResponse);
    const errorInserted = await this._errorService.create(errorDto);

    response.send({
      statusCode: exception.getStatus(),
      //message: `Something bad happened, contact us with tracking id`,
      response: exception.getResponse(),
      trackingId: errorInserted.id,
    });
  }
}
