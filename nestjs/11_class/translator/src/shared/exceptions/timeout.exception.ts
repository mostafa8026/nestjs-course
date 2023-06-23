import { HttpException } from "@nestjs/common";

export class TimeoutException extends HttpException {
  constructor(message: string) {
    super({message}, 500)
  }
}