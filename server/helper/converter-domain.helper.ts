import { mongoose } from '@typegoose/typegoose';
import { HelloWorldClass, HelloWorldDto } from '../models';

export class ConvertToDomain {
  static convert(obj: any): any {
    if (obj instanceof HelloWorldDto) return this.convertHelloWorld(obj as HelloWorldDto);
    throw Error('Missing convert definition');
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
    if (value.createdAt != undefined) result.createdAt = value.createdAt;
    if (value.updatedAt != undefined) result.updatedAt = value.updatedAt;
    return result;
  }
}
