import { Inject, Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { MyLoggerService } from '../my-logger/my-logger.service';
import { Languages } from '../translation/entities/translation.entity';
import { OPENAI_APIKEY } from './constants/injection-tokens';

@Injectable()
export class NestOpenaiService {
  constructor(
    @Inject(OPENAI_APIKEY)
    private openapiKey: string,
    private logger: MyLoggerService,
  ) {}

  async translate(
    sourceLang: Languages,
    targetLang: Languages,
    phrase: string,
  ) {
    const configuration = new Configuration({
      apiKey: this.openapiKey,
    });

    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `You are a translator, I give you a phrase and you should get me the translation. don't provide anything except the translation

      translate from ${sourceLang} to ${targetLang}
      phrase: ${phrase}`,
    });

    this.logger.log(completion.data.choices[0].text);
    return completion.data.choices[0].text;
  }
}
