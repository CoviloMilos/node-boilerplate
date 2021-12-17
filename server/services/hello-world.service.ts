import { injectable } from "inversify";
import { HelloWorldRepo } from "../../config";
import { IHelloWorldRepository, IHelloWorldService } from "../interfaces";
import { HelloWorldDto } from "../models";

@injectable()
export class HelloWorldService implements IHelloWorldService {
  private helloWorldRepository: IHelloWorldRepository;

  constructor(@HelloWorldRepo helloWorldRepository: IHelloWorldRepository) {
    this.helloWorldRepository = helloWorldRepository;
  }

  async sayHello(id: string): Promise<HelloWorldDto> {
    return await this.helloWorldRepository.find(id);
  }

  async createHello(hello: HelloWorldDto): Promise<HelloWorldDto> {
    return await this.helloWorldRepository.create(hello);
  }

  async updateHello(hello: HelloWorldDto): Promise<HelloWorldDto> {
    return await this.helloWorldRepository.update(hello);
  }

  async deleteHello(id: string): Promise<void> {
    await this.helloWorldRepository.delete(id);
    return;
  }
}
