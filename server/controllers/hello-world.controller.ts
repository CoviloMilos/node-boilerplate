import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, response } from "inversify-express-utils";
import { HelloWorldSvc, TYPES } from "../../config";
import { validateRequestBody } from "../helper";
import { IHelloWorldService } from "../interfaces";
import { HelloWorldDto } from "../models";

@controller("/hello", TYPES.RequestContextMiddleware)
export class HelloWorldController implements interfaces.Controller {
  private helloWorldService: IHelloWorldService;

  constructor(@HelloWorldSvc helloWorldService: IHelloWorldService) {
    this.helloWorldService = helloWorldService;
  }

  @httpGet("/")
  public async findHellos(@request() req: Request, @response() res: Response): Promise<Response | undefined> {
    try {
      const filterParams = req.query;
      const result = await this.helloWorldService.findAllHellos(filterParams);
      return res.ok(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @httpPost("/")
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

  @httpGet("/:hello_id")
  public async sayHello(@request() req: Request, @response() res: Response): Promise<Response | undefined> {
    try {
      const id = req.params.hello_id;
      const result = await this.helloWorldService.sayHello(id);
      return res.ok(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @httpPut("/:id")
  public async updateHello(@request() req: Request, @response() res: Response): Promise<Response | undefined> {
    try {
      const id = req.params.id;
      const hello = plainToClass(HelloWorldDto, req.body);
      await validateRequestBody(hello);

      hello.id = id;
      const result = await this.helloWorldService.updateHello(hello);
      return res.ok(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  @httpDelete("/:id")
  public async deleteHello(@request() req: Request, @response() res: Response): Promise<Response | undefined> {
    try {
      const id = req.params.id;
      await this.helloWorldService.deleteHello(id);
      return res.noContent();
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
