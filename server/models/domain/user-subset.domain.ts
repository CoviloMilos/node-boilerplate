import { prop } from '@typegoose/typegoose';

export class UserSubSetDomain {
  @prop()
  id: string;
  @prop()
  fullName: string;
}
