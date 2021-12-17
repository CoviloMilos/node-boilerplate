import * as express from "express";
import { ResponseError } from "../../server/models";

declare global {
  namespace Express {
    export interface Response {
      ok?: any;
      created?: ResponseError;
      noContent?: any;
      badRequest?: ResponseError;
      conflict?: ResponseError;
      notFound?: ResponseError;
      unauthorized?: ResponseError;
      forbidden?: ResponseError;
      serverError?: ResponseError;
    }
  }
}
