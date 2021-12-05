import { plainToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, response } from 'inversify-express-utils';
import { ApiOperationGet, ApiPath } from 'swagger-express-ts';
import { HelloWorldSvc, TYPES } from '../../config';
import { validateRequestBody } from '../helper';
import { IHelloWorldService } from '../interfaces';
import { HelloWorldDto } from '../models';
@ApiPath({
  name: 'Hello',
  path: '/hello',
})
@controller('/hello', TYPES.RequestContextMiddleware)
export class HelloWorldController implements interfaces.Controller {
  private helloWorldService: IHelloWorldService;

  constructor(@HelloWorldSvc helloWorldService: IHelloWorldService) {
    this.helloWorldService = helloWorldService;
  }

  @httpPost('/')
  public async createHello(@request() req: Request, @response() res: Response): Promise<Response | undefined> {
    try {
      const hello = plainToClass(HelloWorldDto, req.body);
      await validateRequestBody(hello);
      const result = await this.helloWorldService.createHello(hello);
      return res.ok(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @ApiOperationGet({
    description: 'Get hello object',
    parameters: {
      path: {
        hello_id: {
          description: 'Hello id',
          required: true,
        },
      },
    },
    path: '/:hello_id',
    responses: {
      200: { description: 'Success' },
      409: { description: 'Parameters fail' },
      404: { description: 'Action not exist' },
    },
    summary: 'Get hello',
  })
  @httpGet('/:hello_id')
  public async sayHello(@request() req: Request, @response() res: Response): Promise<Response | undefined> {
    try {
      const id = req.params.id as string;
      const result = await this.helloWorldService.sayHello(id);
      return res.ok(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @httpPut('/:id')
  public async updateHello(@request() req: Request, @response() res: Response): Promise<Response | undefined> {
    try {
      const id = req.params.id as string;
      const hello = plainToClass(HelloWorldDto, req.body);
      await validateRequestBody(hello);

      hello.id = id;
      const result = await this.helloWorldService.updateHello(hello);
      return res.ok(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @httpDelete('/:id')
  public async deleteHello(@request() req: Request, @response() res: Response): Promise<Response | undefined> {
    try {
      const id = req.params.id as string;
      await this.helloWorldService.deleteHello(id);
      return res.noContent();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
