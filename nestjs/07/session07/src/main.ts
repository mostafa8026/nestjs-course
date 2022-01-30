import {
  catchError,
  delay,
  EMPTY,
  from,
  map,
  Observable,
  of,
  Subscriber,
  tap,
  throwError,
  timeout,
} from 'rxjs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function someRXJSCode() {
  // const observable = new Observable((subscriber) => {
  //   for (var i = 0; i < 100; i++) {
  //     subscriber.next(i);
  //   }

  //   //subscriber.error('asdfsdf');
  //   setTimeout(() => {
  //     subscriber.complete();
  //     subscriber.next('It will not called');
  //   }, 2000);
  // });

  const observable = from([1, 2, 4])
    .pipe(
      tap((item) => {
        console.log('What is the item, it is: ', item);
      }),
    )
    .pipe(
      delay(3000),
      map((item) => {
        return item + 2;
      }),
    )
    .pipe(
      timeout(2000),
      tap((item) => {
        console.log('What is the item, it is: ', item);
      }),
    )
    .pipe(
      map((item) => item + 2),
      catchError((err) => {
        console.log('do some');
        return throwError(() => new Error(err));
      }),
    );

  observable.subscribe({
    next: (value) => {
      console.log(`Next value received: ${value}`);
    },
    complete: () => {
      console.log('Observable completed');
    },
    error: (err) => {
      console.log('ERROR...');
      console.log(err);
    },
  });
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000, () => {
    console.log('Start listening on http://localhost:3000');
  });
}

bootstrap();
//someRXJSCode();
