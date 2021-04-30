import { GenericRepository } from './GenericRepository';
import { Issue } from '../model/Issue';
import { AbstractStorage } from '../storage/AbstractStorage';

export class IssueRepository implements GenericRepository<Issue> {
  private storage: AbstractStorage<Issue>;

  constructor(storage: AbstractStorage<Issue>) {
    this.storage = storage;
  }

  create(domainObject: Issue): Issue | never {
    if (domainObject.Id !== undefined) {
      throw new Error('object can not be persist');
    }

    this.storage.SaveSingleObject(domainObject);

    return domainObject;
  }

  findById(id: Number): Issue | undefined {
    console.log('dd', this.storage);
    let data = this.storage.GetStoredObject();
    return data.find((iss) => iss.Id === id);
  }

  remove(domainObject: Issue): void {
    let data = this.storage.GetStoredObject();

    const ind = data.some((el) => el.Id === domainObject.Id);

    if (!ind) {
      return;
    }

    data = data.filter((iss) => iss.Id !== domainObject.Id);
    this.storage.SaveArrayObject(data);
  }

  update(domainObject: Issue): Issue | undefined {
    let data = this.storage.GetStoredObject();

    const ind = data.some((el) => el.Id === domainObject.Id);

    if (!ind) {
      return;
    }

    data = data.filter((iss) => iss.Id !== domainObject.Id);
    this.storage.SaveArrayObject(data);
    return domainObject;
  }
}
