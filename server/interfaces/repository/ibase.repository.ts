import { BaseDto } from "../../models";

export interface IBaseRepository<T extends BaseDto> {
  findAll(filterParams: any): Promise<T[]>;
  find(id: string): Promise<T>;
  create(item: T): Promise<T>;
  update(item: T, newRecord?: boolean): Promise<T>;
  delete(id: string): Promise<void>;
}
