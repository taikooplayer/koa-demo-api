import { Control, Post, Get } from '../../kernel/decorator/method-mapping.decorator';
import BaseController from '../../kernel/baseController';
import { Query, Body } from '../../kernel/decorator/params.decorator';
import { IsInt, IsNotEmpty } from 'class-validator';

class HomeClass {
  @IsInt()
  b: number;
}

@Control('api/home')
export default class Home extends BaseController {
  @Get('test')
  async test () {
    console.log(33333)
    return "aaaaa";
  }

  @Post('user')
  async user (@Query() query: object, @Body() body: HomeClass) {
    console.log(3333, query, body);
    return "";
  }
}