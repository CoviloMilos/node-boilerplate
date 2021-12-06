import { BaseMiddleware } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';
import { TYPES } from '../../config/constants';

export class RequestContextMiddleware extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction): void {
    {
      let userId: string | undefined = req.header('user_id');
      this.bind<string>(TYPES.UserId).toConstantValue(userId!);

      next();
    }
  }
}
