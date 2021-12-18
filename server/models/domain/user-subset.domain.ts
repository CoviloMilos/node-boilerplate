import { prop } from "@typegoose/typegoose";
import { AutoMap } from "@automapper/classes";
export class UserSubSetDomain {
  @AutoMap()
  @prop()
  id: string;

  @AutoMap()
  @prop()
  fullName: string;
}
