import { getModelForClass, modelOptions, mongoose, prop } from '@typegoose/typegoose';
import { Document } from 'mongoose';

@modelOptions({ schemaOptions: { collection: 'hellos', timestamps: true } })
export class HelloWorldClass {
  @prop()
  public _id: mongoose.Types.ObjectId;
  @prop({ required: true })
  hello: string;

  @prop()
  createdAt?: Date;
  @prop()
  updatedAt?: Date;
}

const HelloWorld = getModelForClass(HelloWorldClass);
export default HelloWorld;
