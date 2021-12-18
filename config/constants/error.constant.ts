import { ValidationError } from "class-validator";
import { ResponseError } from "../../server/models";
import i18n from "../i18n.config";

export const errors = {
  genericServerError: (error: ResponseError): ResponseError => {
    const responseError = new ResponseError(error.name, error.message, 500, error.stack);
    return responseError;
  },

  resourceNotFound: (resource: string): ResponseError => {
    const responseError = new ResponseError(i18n.__("Not_Found"), `${resource} ${i18n.__("Not_Found").toLowerCase()}`, 404, undefined);
    return responseError;
  },

  operationFailed: (operation: string, message: string): ResponseError => {
    const responseError = new ResponseError(`${operation} ${i18n.__("Failed")}`, message, 500, undefined);
    return responseError;
  },

  businessRuleViolation: (message: string): ResponseError => {
    const responseError = new ResponseError(i18n.__("Business_rule_violation"), message, 500, undefined);
    return responseError;
  },

  invalidRequest: (error: ValidationError[]): ResponseError => {
    const validationErrors = error.map((e: ValidationError) => {
      let message = "Unknown";
      if (e.constraints) message = e.constraints[Object.keys(e.constraints)[0]];

      return { property: e.property, message: message };
    });

    const responseError = new ResponseError(i18n.__("Invalid_request"), "", 400, undefined, validationErrors);
    return responseError;
  },

  missingRequiredHeaders: (header: string): ResponseError => {
    const responseError = new ResponseError(i18n.__("Invalid_request"), i18n.__("Missing_header") + " " + header, 400, undefined);
    return responseError;
  },
};
