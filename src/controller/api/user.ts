import { Control, Post, Get } from '../../kernel/decorator/method-mapping.decorator';
import BaseController from '../../kernel/baseController';
import { Query, Body } from '../../kernel/decorator/params.decorator';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Autowired } from '../../kernel/decorator/autowired.decorator';
import UserService from '../../service/user';


@Control('api/user')
export default class User extends BaseController {

  @Autowired()
  public uSer: UserService;

  @Autowired()
  public uSer1: UserService;


  // @Get('test')
  // async test () {
  //   console.log(await this.uSer)
  //   Object.seal
  //   return "aaaaa11111";
  // }

  // @Post('user')
  // async user (@Query() query: object, @Body() body) {

  //   return "";
  // }
}