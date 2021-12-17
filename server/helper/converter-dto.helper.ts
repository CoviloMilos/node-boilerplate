import { HelloWorldClass, HelloWorldDto, ResponseError } from "../models";

export class ConvertToDTO {
  static convert(obj: any, className: string): any {
    switch (className) {
      case HelloWorldClass.name:
        return this.convertHelloWorld(obj as HelloWorldClass);
      default:
        throw new ResponseError("Convert to dto error", "Missing convert dto definition", 500);
    }
  }

  static convertHelloWorld(helloWorld: HelloWorldClass): HelloWorldDto {
    let result = new HelloWorldDto();
    result = this.convertBase(helloWorld);
    result.hello = helloWorld.hello;
    return result;
  }

  static convertBase(value: any): any {
    const result: any = {};
    result.id = value._id.toString();
    if (value.createdBy) result.createdBy = value.createdBy;
    if (value.updatedBy) result.updatedBy = value.updatedBy;

    if (value.createdAt) result.createdAt = value.createdAt;
    if (value.updatedAt) result.updatedAt = value.updatedAt;
    return result;
  }
}
