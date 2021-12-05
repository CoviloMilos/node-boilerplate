
import { ResponseError } from "../../server/models";
import i18n from "../i18n.config";

export const errors = {
  genericServerError: (error: any) => {
    let responseError = new ResponseError(error.name, error.message, 500, error.stack);
    return responseError;
  },

  resourceNotFound: (resource: string) => {
    let responseError = new ResponseError(i18n.__("Not_Found"), `${resource} ${i18n.__("Not_Found").toLowerCase()}`, 404, undefined);
    return responseError;
  },

  operationFailed: (operation: string, message: string) => {
    let responseError = new ResponseError(`${operation} ${i18n.__("Failed")}`, message, 500, undefined);
    return responseError;
  },

  businessRuleViolation: (message: string) => {
    let responseError = new ResponseError(i18n.__("Business_rule_violation"), message, 500, undefined);
    return responseError;
  },

  invalidRequest: (error: any) => {
    const validationErrors = error.map((e: any) => {
      const propety = e.property;
      let message = "";

      // Used only for nested objects validation
      if (e.children.length > 0 && !e.constraints) {
        let contraint: any = e.children[0].children[0].constraints;
        message = contraint[Object.keys(contraint)[0]];
      } else message = e.constraints[Object.keys(e.constraints)[0]];
      return { propety, message };
    });

    let responseError = new ResponseError(i18n.__("Invalid_request"), "", 400, undefined, validationErrors);
    return responseError;
  },

  missingRequiredHeaders: (header: string) => {
    let responseError = new ResponseError(i18n.__("Invalid_request"), i18n.__("Missing_header") + " " + header, 400, undefined);
    return responseError;
  },
};
