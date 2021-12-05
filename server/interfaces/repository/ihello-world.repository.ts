import { IBaseRepository } from '.';
import { HelloWorldDto } from '../../models';

export interface IHelloWorldRepository extends IBaseRepository<HelloWorldDto> {
  createHello(hello: HelloWorldDto): Promise<HelloWorldDto>;
}
