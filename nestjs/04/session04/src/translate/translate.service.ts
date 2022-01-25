import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

export enum Fields {
  BannerText,
}

const fa = {
  [Fields.BannerText]: 'تست',
};

const en = {
  [Fields.BannerText]: 'test',
};

@Injectable({
  scope: Scope.REQUEST,
})
export class TranslateService {
  constructor(@Inject(REQUEST) private readonly request: Request) {
    console.log('TranslateService');
  }

  translate(f: Fields) {
    if (this.request.headers['accept-language'] == 'en') {
      return en[f];
    } else {
      return fa[f];
    }
  }
}
