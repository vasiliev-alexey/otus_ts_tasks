import { Storage } from './Storage';
import * as Logger from 'debug';
import { DomainObject } from '../model/DomainObject';
import { Issue } from '../model/Issue';

export namespace LocalStorage {
  export abstract class LocalStorageService<
    T extends DomainObject,
    K extends string
  > implements Storage<T>
  {
    protected constructor(private collectionKey: K) {}

    async getStoredObject(): Promise<T[]> {
      const storageData = localStorage.getItem(this.collectionKey)!;
      if (storageData === null) {
        return [];
      }
      return this.Deserialize(storageData);
    }

    async saveArrayObject(data: T[]): Promise<void> {
      Logger.log('LocalStorageRepository save', data);

      const savedData = await this.getStoredObject();

      data.map((item) => {
        let existData = savedData.indexOf(item);

        if (existData === -1) {
          savedData.push(item);
        } else {
          savedData[existData] = item;
        }
      });
      localStorage.setItem(this.collectionKey, JSON.stringify(savedData));
    }

    async saveSingleObject(data: T): Promise<void> {
      await this.saveArrayObject([data]);
    }

    public abstract Deserialize(json: string): T[];
  }

  export class IssueLocalStorageService extends LocalStorageService<
    Issue,
    string
  > {
    public constructor() {
      super('Issue');
    }

    Deserialize(json: string): Issue[] {
      let data = JSON.parse(json);
      return data.map((el: Object) => {
        let issue = new Issue();
        Object.assign(issue, el);
        if (el.hasOwnProperty('IssueDate')) {
          issue['IssueDate'] = new Date(issue['IssueDate']);
        }
        return issue;
      });
    }
  }
}
