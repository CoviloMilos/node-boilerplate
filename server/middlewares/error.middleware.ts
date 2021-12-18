import { ResponseError } from "../models";
import { NextFunction, Request, Response } from "express";
import { errors } from "../../config";

export const handleErrorMiddleware = (
  err: ResponseError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): Response<ResponseError> => {
  switch (err.code) {
    case 400:
      return res.badRequest(err);
    case 401:
      return res.unauthorized(err);
    case 403:
      return res.forbidden(err);
    case 404:
      return res.notFound(err);
    case 409:
      return res.conflict(err);
    case null:
    case undefined:
    case 500:
      return res.serverError(errors.genericServerError(err));
    default:
      return res.badRequest(err);
  }
};
