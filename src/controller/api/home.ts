import { Control, Post, Get } from '../../kernel/decorator/method-mapping.decorator';
import BaseController from '../../kernel/baseController';
import { Query, Body, Params, Headers, Cookies, Context, Response } from '../../kernel/decorator/params.decorator';
import { IsInt, IsNotEmpty } from 'class-validator';
import { Autowired } from '../../kernel/decorator/autowired.decorator';
import UserService from '../../service/user';
import { VUser } from '../../entities/VUser';
import NewService from '../../service/user/user';
import { Model } from '../../kernel/model';

class HomeClass {
  @IsInt()
  b: number;
}

@Control('api/home')
export default class Home extends BaseController {

  @Autowired({z: 1, k: 2})
  public uSer: UserService;

  @Autowired()
  public newSer: NewService;

  // @Get('test/:id')
  // async test (@Query() query) {
  //   console.log(22221111, query)

  //   return {a: 123, b: 33};
  // }

  @Get('test/:id')
  async test (@Response() res) {
    const a = await Model.getInstance('admin').getRepository(VUser).findOne({ id: 1 });

    console.log(3333, a);
    return {a: 123, b: 33};
  }

  // @Post('user')
  // async user (@Query() query: object, @Body() body: HomeClass) {

  //   return "";
  // }
}