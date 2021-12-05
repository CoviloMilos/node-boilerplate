import { AnyParamConstructor } from '@typegoose/typegoose/lib/types';
import { injectable } from 'inversify';
import { IHelloWorldRepository } from '../interfaces';
import { EntityName, HelloWorldClass, HelloWorldDto } from '../models';
import { BaseRepository } from './base.repository';

@injectable()
export class HelloWorldRepository
  extends BaseRepository<HelloWorldDto, AnyParamConstructor<HelloWorldClass>>
  implements IHelloWorldRepository
{
  constructor() {
    super(HelloWorldClass, EntityName.HelloWorld);
  }
}
