import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { controller, httpGet, httpPost, interfaces, request, response } from 'inversify-express-utils';
import { HelloWorldSvc, TYPES } from '../../config';
import { validateRequestBody } from '../helper';
import { IHelloWorldService } from '../interfaces';
import { HelloWorldDto } from '../models';

@controller('/hello', TYPES.RequestContextMiddleware)
export class HelloWorldController implements interfaces.Controller {
  private helloWorldService: IHelloWorldService;

  constructor(@HelloWorldSvc helloWorldService: IHelloWorldService) {
    this.helloWorldService = helloWorldService;
  }

  @httpGet('/')
  public async sayHello(@request() req: Request, @response() res: Response): Promise<Response | undefined> {
    try {
      const result = await this.helloWorldService.sayHello();
      return res.ok(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @httpPost('/')
  public async createHello(@request() req: Request, @response() res: Response): Promise<Response | undefined> {
    try {
      const helloDto = plainToClass(HelloWorldDto, req.body);
      await validateRequestBody(helloDto);
      const result = await this.helloWorldService.createHello(helloDto);
      return res.ok(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
