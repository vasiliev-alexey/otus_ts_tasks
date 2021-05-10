import { DomainObject } from '../model/DomainObject';
import { AbstractStorage } from './AbstractStorage';

import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Issue } from '../model/Issue';

const db = new JsonDB(new Config('myDataBase', true, false, '/'));

export namespace JSONDbStorage {
  class JSONDbStorageService<T extends DomainObject, K extends string>
    implements AbstractStorage<T> {
    protected constructor(private collectionKey: K) {}

    GetStoredObject(): T[] {
      return db.getObject(this.collectionKey);
    }

    SaveArrayObject(data: T[]): void {
      db.push(this.collectionKey, data);
    }

    SaveSingleObject(data: T): void {
      let dataStored = db.getData(this.collectionKey) as T[];
      dataStored.push(data);
    }
  }

  export class IssueJSONDbStorageService extends JSONDbStorageService<
    Issue,
    string
  > {
    public constructor() {
      super('Issue');
    }
  }
}
