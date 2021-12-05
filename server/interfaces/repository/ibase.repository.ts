export interface IBaseRepository<T> {
  find(id: string): Promise<T>;
  create(item: T): Promise<T>;
}
