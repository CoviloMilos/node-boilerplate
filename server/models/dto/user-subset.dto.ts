import { AutoMap } from "@automapper/classes";

export class UserSubSetDto {
  @AutoMap()
  id: string;

  @AutoMap()
  fullName: string;
}
