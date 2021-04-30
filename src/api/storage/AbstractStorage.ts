import { DomaiObject } from '../model/DomaiObject';

export interface AbstractStorage<T extends DomaiObject> {
  GetStoredObject(): T[];

  SaveArrayObject(data: T[]): void;
  SaveSingleObject(data: T): void;
}
