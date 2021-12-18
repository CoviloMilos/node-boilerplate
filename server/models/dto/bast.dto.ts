import { Expose } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { UserSubSetDto } from ".";

export class BaseDto {
  id!: string;

  @Expose()
  createdBy!: UserSubSetDto;
  @Expose()
  updatedBy!: UserSubSetDto;

  @Expose()
  @IsNotEmpty()
  createdAt?: Date;
  @Expose()
  updatedAt?: Date;
}
