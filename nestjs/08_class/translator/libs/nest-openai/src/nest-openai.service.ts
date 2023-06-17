import { Inject, Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_APIKEY } from './constants/injection-tokens';
import { OpenAiService } from './openai.service';

@Injectable()
export class NestOpenaiService extends OpenAiService {
  constructor(
    @Inject(OPENAI_APIKEY)
    private openapiKey: string,
  ) {
    super();
  }

  async translate(
    sourceLang: string,
    targetLang: string,
    phrase: string,
  ) {
    return this.sharedTranslate(sourceLang, targetLang, phrase, this.openapiKey);
  }
}
