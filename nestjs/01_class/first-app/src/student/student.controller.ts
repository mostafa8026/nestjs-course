import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

@Controller('student')
export class StudentController {
  @Get()
  findAll() {
    return 'All student';
  }

  @Get('/paginate')
  findAllPaginated(@Query() query) {
    return `All student, paginated, page: ${query.page}, count: ${query.count}`;
  }

  @Get('/:id')
  findOne(@Param('id') id) {
    return `find student ${id}`;
  }

  @Post('/')
  insert(@Body('name') name) {
    return `insert new student with body of ${name}`;
  }

  @Put(':id')
  update(@Param('id') id, @Body() body) {
    return `update student, id of ${id}, with body ${body.name}`;
  }

  @Patch(':id')
  patch(@Param('id') id, @Body() body) {
    return `patch student, id of ${id}, with body ${body.name}`;
  }

  @Delete(':id')
  delete(@Param('id') id) {
    return `delete student, id of ${id}`;
  }
}
