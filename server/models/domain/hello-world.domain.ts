import { getModelForClass, modelOptions, prop } from "@typegoose/typegoose";
import { BaseDomain } from "./base-domain";

@modelOptions({ schemaOptions: { collection: "hellos", timestamps: true } })
export class HelloWorldClass extends BaseDomain {
  @prop({ required: true })
  hello: string;
}

const HelloWorld = getModelForClass(HelloWorldClass);
export default HelloWorld;
