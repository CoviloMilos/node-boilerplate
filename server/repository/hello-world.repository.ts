import { injectable } from 'inversify';
import { IHelloWorldRepository } from '../interfaces';
import { HelloWorldDto } from '../models';

import i18n from '../../config/i18n.config';
import { errors } from '../../config';
import { ConvertToDomain, ConvertToDTO } from '../helper';
import HelloWorld, { HelloWorldClass } from '../models/domain/hello-world.domain';
import { BaseRepository } from './base.repository';
import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';

@injectable()
export class HelloWorldRepository
  extends BaseRepository<HelloWorldDto, AnyParamConstructor<HelloWorldClass>>
  implements IHelloWorldRepository
{
  constructor() {
    super(HelloWorldClass);
  }
  async createHello(hello: HelloWorldDto): Promise<HelloWorldDto> {
    try {
      const instance = ConvertToDomain.convertHelloWorld(hello);
      const result = await HelloWorld.create(instance);
      return ConvertToDTO.convertHelloWorld(result);
    } catch (error: any) {
      return Promise.reject(errors.operationFailed(i18n.__('Repository_create'), error.message));
    }
  }
}
