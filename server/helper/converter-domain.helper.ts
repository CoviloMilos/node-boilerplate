import { mongoose } from '@typegoose/typegoose';
import { HelloWorldClass, HelloWorldDto } from '../models';

export class ConvertToDomain {
  static convert(obj: any, className: string): any {
    switch (className) {
      case HelloWorldClass.name:
        return this.convertHelloWorld(obj as HelloWorldDto);
      default:
        throw Error('Missing convert domain definition');
    }
  }

  static convertHelloWorld(helloWorld: HelloWorldDto): HelloWorldClass {
    let result = new HelloWorldClass();
    result = this.convertBase(helloWorld);
    result.hello = helloWorld.hello;
    return result;
  }

  static convertBase(value: any): any {
    let result: any = {};
    result._id = value.id ? new mongoose.Types.ObjectId(value.id) : new mongoose.Types.ObjectId();

    if (value.createdBy) result.createdBy = value.createdBy;
    if (value.updatedBy) result.updatedBy = value.updatedBy;

    if (value.createdAt) result.createdAt = value.createdAt;
    if (value.updatedAt) result.updatedAt = value.updatedAt;
    return result;
  }
}
