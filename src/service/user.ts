import BaseService from '../kernel/baseService';
import { Injectable } from '../kernel/decorator/injectable.decorator';
import { Autowired } from '../kernel/decorator/autowired.decorator';
import SystemService from './system';

@Injectable()
export default class UserService extends BaseService {

  // @Autowired()
  // protected sSer: SystemService;

  public async test() {
    return '21';
  }
}
