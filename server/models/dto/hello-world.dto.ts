import { IsNotEmpty } from "class-validator";
import { BaseDto } from ".";
import { AutoMap } from "@automapper/classes";

export class HelloWorldDto extends BaseDto {
  @AutoMap()
  @IsNotEmpty()
  hello!: string;
}
