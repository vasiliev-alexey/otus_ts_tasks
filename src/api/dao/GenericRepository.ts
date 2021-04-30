import { DomaiObject } from '../model/DomaiObject';

export interface GenericRepository<T extends DomaiObject> {
  findById(id: Number): T | undefined;
  remove(domainObject: T): void;
  update(domainObject: T): T | undefined;
  create(domainObject: T): T;
}
