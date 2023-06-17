import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { OpenAiService } from './openai.service';

const ApiKeyHeader = 'x-open-ai-api-key';
@Injectable({
  scope: Scope.REQUEST,
})
export class NestOpenaiRequestScopeService extends OpenAiService {
  constructor(
    @Inject(REQUEST)
    private req: Request,
  ) {
    super();
    console.log('>>>>>>>>>> request ');
  }

  translate(sourceLang: string, targetLang: string, phrase: string) {
    console.log(this.req.headers[ApiKeyHeader]);
    return this.sharedTranslate(
      sourceLang,
      targetLang,
      phrase,
      this.req.headers[ApiKeyHeader] as string,
    );
  }
}
