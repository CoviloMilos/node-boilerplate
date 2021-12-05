import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { HelloWorldClass, HelloWorldDto } from '../models';

export class ConvertToDTO {
  static convert(obj: any, item: AnyParamConstructor<any>): any {
    if (item.name === HelloWorldClass.name) return this.convertHelloWorld(obj as HelloWorldClass);
    throw Error('Missing convert definition');
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
    result.tenantId = value.tenantId;
    if (value.updatedAt != undefined) result.updatedAt = value.updatedAt;
    if (value.createdAt != undefined) result.createdAt = value.createdAt;
    return result;
  }
}
