import { DomainObject } from '../model/DomainObject';
import { Storage } from './Storage';

import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';
import { Issue } from '../model/Issue';

export namespace JSONDbStorage {
  class JSONDbStorageService<T extends DomainObject, K extends string>
    implements Storage<T>
  {
    private db: JsonDB;
    protected constructor(private collectionKey: K) {
      this.db = new JsonDB(new Config('myDataBase', true, false, '/'));
    }

    async getStoredObject(): Promise<T[]> {
      return this.db.getObject(this.collectionKey);
    }

    async saveArrayObject(data: T[]): Promise<void> {
      this.db.push(this.collectionKey, data);
    }

    async saveSingleObject(data: T): Promise<void> {
      let dataStored = this.db.getData(this.collectionKey) as T[];
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
