import { IsNotEmpty } from "class-validator";
import { BaseDto } from ".";

export class HelloWorldDto extends BaseDto {
  @IsNotEmpty()
  hello!: string;
}
