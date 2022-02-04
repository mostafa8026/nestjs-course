import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Console } from 'console';
import * as session from 'express-session';
import * as passport from 'passport';
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

  app.use(
    session({
      secret: 'My Strong Secret Key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  const options = new DocumentBuilder()
    .setTitle('Our Api Specification')
    .setVersion('1.0.0')
    .setDescription('Our Api Description')
    .addBearerAuth()
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

bootstrap();
//testRXJS();
