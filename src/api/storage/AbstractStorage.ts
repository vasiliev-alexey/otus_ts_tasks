import { DomainObject } from '../model/DomainObject';

export interface AbstractStorage<T extends DomainObject> {
  GetStoredObject(): T[];

  SaveArrayObject(data: T[]): void;
  SaveSingleObject(data: T): void;
}
