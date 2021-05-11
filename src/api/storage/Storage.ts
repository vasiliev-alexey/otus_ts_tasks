import { DomainObject } from '../model/DomainObject';

export interface Storage<T extends DomainObject> {
  getStoredObject(): Promise<T[]>;

  saveArrayObject(data: T[]): Promise<void>;
  saveSingleObject(data: T): Promise<void>;
}
