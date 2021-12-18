import { mongoose, prop } from "@typegoose/typegoose";
import { UserSubSetDomain } from "./user-subset.domain";
import { AutoMap } from "@automapper/classes";

export class BaseDomain {
  @prop({ required: true })
  _id: mongoose.Types.ObjectId;

  @AutoMap({ typeFn: () => UserSubSetDomain })
  @prop({ type: UserSubSetDomain, _id: false })
  createdBy!: UserSubSetDomain;

  @AutoMap({ typeFn: () => UserSubSetDomain })
  @prop({ type: UserSubSetDomain, _id: false })
  updatedBy!: UserSubSetDomain;

  @AutoMap()
  @prop()
  createdAt?: Date;

  @AutoMap()
  @prop()
  updatedAt?: Date;
}
