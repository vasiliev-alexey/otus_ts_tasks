import { AbstractStorage } from './AbstractStorage';
import * as Logger from 'debug';
import { DomaiObject } from '../model/DomaiObject';
import { Issue } from '../model/Issue';

export namespace LocalStorage {
  export abstract class LocalStorageService<
    T extends DomaiObject,
    K extends string
  > implements AbstractStorage<T> {
    constructor(private collectionKey: K) {}

    GetStoredObject(): T[] {
      const storageData = localStorage.getItem(this.collectionKey)!;
      if (storageData === null) {
        return [];
      }
      return this.Deserialize(storageData);
    }

    SaveArrayObject(data: T[]): void {
      Logger.log('LocalStorageRepository save', data);

      const savedData = this.GetStoredObject();

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

    SaveSingleObject(data: T): void {
      this.SaveArrayObject([data]);
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
        let iss = new Issue();
        Object.assign(iss, el);
        if (el.hasOwnProperty('IssueDate')) {
          iss['IssueDate'] = new Date(iss['IssueDate'].toString());
        }
        return iss;
      });
    }
  }
}