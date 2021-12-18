import * as express from "express";
import { ResponseError } from "../../server/models";

declare global {
  namespace Express {
    export interface Response {
      ok?: any;
      created(err: ResponseError): any;
      noContent(): any;
      badRequest(err: ResponseError): any;
      conflict(err: ResponseError): any;
      notFound(err: ResponseError): any;
      unauthorized(err: ResponseError): any;
      forbidden(err: ResponseError): any;
      serverError(err: ResponseError): any;
    }
  }
}
