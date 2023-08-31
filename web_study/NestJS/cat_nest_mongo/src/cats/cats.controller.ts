import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  HttpException,
  HttpStatus,
  UseFilters,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getAllCats() {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    // throw new HttpException({ success: false, message: 'test' }, 401);
    return 'all cats';
  }

  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe) id: number) {
    console.log(id, typeof id);
    return 'one cat';
  }

  @Post()
  createCat() {
    return 'create cat';
  }

  @Put(':id')
  updateCat() {
    return 'update cat';
  }

  @Patch(':id')
  updatePartialCat() {
    return 'update partial cat';
  }

  @Delete(':id')
  deleteCat() {
    return 'delete cat';
  }
}
