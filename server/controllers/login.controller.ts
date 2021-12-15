import { plainToClass } from "class-transformer";
import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, interfaces, request, response } from "inversify-express-utils";
import { TYPES } from "../../config";
import { IKeycloakService } from "../interfaces";

@controller("/login", TYPES.RequestContextMiddleware)
export class LoginController implements interfaces.Controller {
  private keycloakService: IKeycloakService;

  constructor(@inject(TYPES.KeycloakService) keycloakService: IKeycloakService) {
    this.keycloakService = keycloakService;
  }

  @httpPost("/")
  public async login(@request() req: Request, @response() res: Response): Promise<Response | undefined> {
    try {
      const result = await this.keycloakService.login(req.body.username, req.body.password);
      return res.ok(result);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
