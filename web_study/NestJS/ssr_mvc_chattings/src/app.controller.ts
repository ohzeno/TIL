import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index') // index.html로 전달
  root() {
    return { message: 'Hello world!!!' };
  }
}
