import { IsNotEmpty } from "class-validator";
import { UserSubSetDto } from ".";
import { AutoMap } from "@automapper/classes";

export class BaseDto {
  id!: string;

  @AutoMap({ typeFn: () => UserSubSetDto })
  createdBy!: UserSubSetDto;

  @AutoMap({ typeFn: () => UserSubSetDto })
  updatedBy!: UserSubSetDto;

  @AutoMap()
  @IsNotEmpty()
  createdAt?: Date;

  @AutoMap()
  updatedAt?: Date;
}
