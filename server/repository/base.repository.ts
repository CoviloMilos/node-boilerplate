import { getModelForClass } from "@typegoose/typegoose";
import { AnyParamConstructor, ReturnModelType } from "@typegoose/typegoose/lib/types";
import { injectable, unmanaged } from "inversify";
import { Converter } from "../helper";
import { IBaseRepository } from "../interfaces";
import { errors } from "../../config";
import { BaseDomain, BaseDto } from "../models";
import { EntityName } from "../models/enum";
import i18n from "../../config/i18n.config";

@injectable()
export abstract class BaseRepository<TDto extends BaseDto, TDomain extends AnyParamConstructor<BaseDomain>>
  implements IBaseRepository<TDto>
{
  private readonly dataModel: ReturnModelType<TDomain>;

  // @unmanaged() prevent users from forgetting to inject all the required arguments into a Base class
  constructor(@unmanaged() public entity: TDomain, @unmanaged() public entityName: EntityName) {
    this.dataModel = getModelForClass(entity);
  }

  async findAll(filterParams: any): Promise<TDto[]> {
    try {
      const result = await this.dataModel.find(filterParams);
      return result.map((obj) => Converter.convertDto(obj.toObject(), this.entity.name));
    } catch (error: any) {
      return Promise.reject(errors.operationFailed(i18n.__("Repository_get"), error.message));
    }
  }

  async find(id: string): Promise<TDto> {
    try {
      const result = await this.dataModel.findById(id).lean();
      if (result == null) return Promise.reject(errors.resourceNotFound(i18n.__(this.entityName)));
      return Converter.convertDto(result, this.entity.name);
    } catch (error: any) {
      return Promise.reject(errors.operationFailed(i18n.__("Repository_get"), error.message));
    }
  }
  async create(item: TDto): Promise<TDto> {
    try {
      const itemClass: TDomain = Converter.convertDomain(item, this.entity.name);
      const result = await this.dataModel.create(itemClass);
      return Converter.convertDto(result.toObject(), this.entity.name);
    } catch (error: any) {
      return Promise.reject(errors.operationFailed(i18n.__("Repository_create"), error.message));
    }
  }

  async update(item: TDto, newRecord = true): Promise<TDto> {
    try {
      const itemClass = Converter.convertDomain(item, this.entity.name);
      const result = await this.dataModel.findByIdAndUpdate(item.id, itemClass, { new: newRecord });
      if (result == null) return Promise.reject(errors.resourceNotFound(i18n.__(this.entityName)));
      return Converter.convertDto(result.toObject(), this.entity.name);
    } catch (error: any) {
      return Promise.reject(errors.operationFailed(i18n.__("Repository_update"), error.message));
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const result = await this.dataModel.findByIdAndDelete(id);
      if (result == null) return Promise.reject(errors.resourceNotFound(i18n.__(this.entityName)));
      return;
    } catch (error: any) {
      return Promise.reject(errors.operationFailed(i18n.__("Repository_delete"), error.message));
    }
  }
}
