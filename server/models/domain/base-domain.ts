import { mongoose, prop } from "@typegoose/typegoose";
import { Expose } from "class-transformer";
import { UserSubSetDomain } from "./user-subset.domain";

export class BaseDomain {
  @prop({ required: true })
  _id: mongoose.Types.ObjectId;

  @Expose()
  @prop({ type: UserSubSetDomain, _id: false })
  createdBy!: UserSubSetDomain;
  @Expose()
  @prop({ type: UserSubSetDomain, _id: false })
  updatedBy!: UserSubSetDomain;
  @Expose()
  @prop()
  createdAt?: Date;
  @Expose()
  @prop()
  updatedAt?: Date;
}
