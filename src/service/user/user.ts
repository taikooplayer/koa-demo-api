import BaseService from '../../kernel/baseService';
import { Injectable } from '../../kernel/decorator/injectable.decorator';



@Injectable()
export default class UserService extends BaseService {
  public async test() {
    return '21';
  }
}
