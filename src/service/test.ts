import BaseService from '../kernel/baseService';

export default class TestService extends BaseService {
  public async test() {
    return '21';
  }
}
