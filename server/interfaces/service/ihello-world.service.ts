import { HelloWorldDto } from '../../models';

export interface IHelloWorldService {
  sayHello(): Promise<HelloWorldDto>;
  createHello(hello: HelloWorldDto): Promise<HelloWorldDto>;
}
