import { UserSubSetDto } from '.';

export class BaseDto {
  id!: string;

  createdBy!: UserSubSetDto;
  updatedBy!: UserSubSetDto;

  createdAt?: Date;
  updatedAt?: Date;
}
