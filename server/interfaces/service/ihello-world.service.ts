import { HelloWorldDto } from "../../models";

export interface IHelloWorldService {
  sayHello(id: string): Promise<HelloWorldDto>;
  createHello(hello: HelloWorldDto): Promise<HelloWorldDto>;
  updateHello(hello: HelloWorldDto): Promise<HelloWorldDto>;
  deleteHello(id: string): Promise<void>;
}
