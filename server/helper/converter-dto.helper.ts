import { HelloWorldClass, HelloWorldDto } from "../models";

export class ConvertToDTO {
  static convert(obj: any, className: string): any {
    switch (className) {
      case HelloWorldClass.name:
        return this.convertHelloWorld(obj as HelloWorldClass);
      default:
        throw Error("Missing convert dto definition");
    }
  }

  static convertHelloWorld(helloWorld: HelloWorldClass): HelloWorldDto {
    let result = new HelloWorldDto();
    result = this.convertBase(helloWorld);
    result.hello = helloWorld.hello;
    return result;
  }

  static convertBase(value: any): any {
    let result: any = {};
    result.id = value._id.toString();
    if (value.createdBy) result.createdBy = value.createdBy;
    if (value.updatedBy) result.updatedBy = value.updatedBy;

    if (value.createdAt) result.createdAt = value.createdAt;
    if (value.updatedAt) result.updatedAt = value.updatedAt;
    return result;
  }
}
