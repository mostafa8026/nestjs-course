import { hashSync, compare } from 'bcrypt';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Console } from 'console';
import {
  catchError,
  delay,
  from,
  map,
  Observable,
  tap,
  throwError,
  timeout,
} from 'rxjs';
import { AppModule } from './app/app.module';
import { WrapperResponseInterceptor } from './common/interceptors/wrapper-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new WrapperResponseInterceptor());

  const options = new DocumentBuilder()
    .setTitle('Our Api Specification')
    .setVersion('1.0.0')
    .setDescription('Our Api Description')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs', app, document);

  await app.listen(3000, () => {
    console.log('Start listening on http://localhost:3000');
  });
}

async function testRXJS() {
  // const observable = new Observable((subscriber) => {
  //   subscriber.next(1);
  //   subscriber.next(2);

  //   let i = 3;
  //   while (i <= 10) {
  //     subscriber.next(i);
  //     i++;
  //   }

  //   subscriber.complete();
  // });

  const observable = from([1, 2, 3])
    .pipe(
      map((item) => item + 1),
      tap((item) => {
        console.log(item);
      }),
      delay(3000),
      map((item) => item + 1),
      timeout(1000),
      catchError((err) => {
        console.log(`Inside pipe, `, err);
        return throwError(() => new Error(err));
      }),
    )
    .subscribe({
      next: (value) => {
        console.log(`next called, ${value}`);
      },
      complete: () => {
        console.log(`completed`);
      },
      error: (err) => {
        console.log(`error, ${err}`);
      },
    });
}

let hashSaltRounds = 10;

export function hashPassword(password: string) {
  return hashSync(password, hashSaltRounds);
}

export function comparePassword(password: string, hashPassword: string) {
  return compare(password, hashPassword);
}

async function testBCrypt() {
  console.time('hash time');
  hashSaltRounds = 18;

  let hash1 = hashPassword('123123');
  let hash2 = hashPassword('123123');
  console.log('hash1: ', hash1);
  console.log('hash2: ', hash2);

  console.log(await compare('123123', hash1));
  console.log(await compare('123123', hash2));
  console.timeEnd('hash time');
}

bootstrap();
//testRXJS();
//testBCrypt();
