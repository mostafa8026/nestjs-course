import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { StudentController } from './student/student.controller';

@Module({
  controllers: [AppController, StudentController],
})
export class AppModule {}
