import { NextFunction, Request, Response } from "express";

export interface IRequestContextMiddleware {
  handler(req: Request, res: Response, next: NextFunction): void;
}
