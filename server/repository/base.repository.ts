import { getModelForClass } from '@typegoose/typegoose';
import { AnyParamConstructor, ModelType, ReturnModelType } from '@typegoose/typegoose/lib/types';
import { injectable, unmanaged } from 'inversify';
import { Document, Model } from 'mongoose';
import { ConvertToDTO } from '../helper';
import { IBaseRepository } from '../interfaces';

import { prop, types, DocumentType } from '@typegoose/typegoose'; // @typegoose/typegoose@7.2.0

@injectable()
export abstract class BaseRepository<TEntity, TModel extends types.AnyParamConstructor<any>> implements IBaseRepository<TEntity> {
  public dataModel: ReturnModelType<TModel>;

  constructor(@unmanaged() public cls: TModel) {
    this.dataModel = getModelForClass(cls);
  }

  async find(id: string): Promise<TEntity> {
    console.log('ide gas');
    const a = await this.dataModel.findById(id);
    console.log(a);
    if (a == null) return Promise.reject();

    return ConvertToDTO.convert(a, this.cls);
  }
  create(item: TEntity): Promise<TEntity> {
    throw new Error('Method not implemented.');
  }
}
