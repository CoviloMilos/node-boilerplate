import { HelloWorldClass, HelloWorldDto, ResponseError } from "../models";
import { objectMapper } from "../models/object-mapper";

export class Converter {
  static convertDto(obj: any, className: string): any {
    switch (className) {
      case HelloWorldClass.name:
        return objectMapper.map(obj, HelloWorldDto, HelloWorldClass);
      default:
        throw new ResponseError("Convert to dto error", "Missing convert dto definition", 500);
    }
  }

  static convertDomain(obj: any, className: string): any {
    switch (className) {
      case HelloWorldClass.name:
        return objectMapper.map(obj, HelloWorldClass, HelloWorldDto);
      default:
        throw new ResponseError("Convert to domain error", "Missing convert domain definition", 500);
    }
  }
}
