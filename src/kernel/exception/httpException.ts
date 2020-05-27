
export class HttpException extends Error {

  private readonly code;

  constructor (message: string, code: number) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = 'HttpException';
    this.message = message;
    this.code = code;
    // this.stack
  }

}