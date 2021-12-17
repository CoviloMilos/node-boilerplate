import { mongoose, prop } from "@typegoose/typegoose";
import { UserSubSetDomain } from "./user-subset.domain";

export class BaseDomain {
  @prop({ required: true })
  _id: mongoose.Types.ObjectId;

  @prop({ type: UserSubSetDomain, _id: false })
  createdBy!: UserSubSetDomain;
  @prop({ type: UserSubSetDomain, _id: false })
  updatedBy!: UserSubSetDomain;

  @prop()
  createdAt?: Date;
  @prop()
  updatedAt?: Date;
}
