import { inject, injectable } from 'inversify';
import { HelloWorldRepo, TYPES } from '../../config';
import { ConvertToDomain } from '../helper';
import { IHelloWorldRepository, IHelloWorldService } from '../interfaces';
import { HelloWorldDto } from '../models';

@injectable()
export class HelloWorldService implements IHelloWorldService {
  private helloWorldRepository: IHelloWorldRepository;

  constructor(@HelloWorldRepo helloWorldRepository: IHelloWorldRepository) {
    this.helloWorldRepository = helloWorldRepository;
  }
  async createHello(hello: HelloWorldDto): Promise<HelloWorldDto> {
    const instanceClass = ConvertToDomain.convertHelloWorld(hello);
    // this.helloWorldRepository.
    return await this.helloWorldRepository.createHello(hello);
  }
  async sayHello(): Promise<HelloWorldDto> {
    const value = await this.helloWorldRepository.find('61ab9fb4888bf7da50f038be');
    return new HelloWorldDto();
  }
}
