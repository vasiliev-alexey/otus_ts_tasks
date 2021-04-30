import { GenericRepository, IssueFinder } from './GenericRepository';
import { Issue, IssueStatus } from '../model/Issue';
import { AbstractStorage } from '../storage/AbstractStorage';

export class IssueRepository implements GenericRepository<Issue>, IssueFinder {
  private storage: AbstractStorage<Issue>;

  constructor(storage: AbstractStorage<Issue>) {
    this.storage = storage;
  }

  async findByTitle(Title: string): Promise<Issue[]> {
    return this.findBy((i) => i.Title === Title);
  }

  async findByStatus(Status: IssueStatus): Promise<Issue[]> {
    return this.findBy((i) => i.Status === Status);
  }

  async findByDate(IssueDate: Date): Promise<Issue[]> {
    return this.findBy((i) => i.IssueDate === IssueDate);
  }

  async findByTags(Tag: string): Promise<Issue[]> {
    return this.findBy(
      (i) => i.Tags?.length > 0 && i.Tags.some((t) => t === Tag)
    );
  }

  private async findBy(predicate: (val: Issue) => boolean): Promise<Issue[]> {
    let data = this.storage.GetStoredObject();
    return Promise.resolve(
      data.filter((d) => {
        return predicate.call(this, d);
      })
    );
  }

  async create(domainObject: Issue): Promise<Issue | never> {
    if (domainObject.Id !== undefined) {
      throw new Error('object can not be persist');
    }

    this.storage.SaveSingleObject(domainObject);

    return Promise.resolve(domainObject);
  }

  findById(id: Number): Promise<Issue | undefined> {
    let data = this.storage.GetStoredObject();
    return Promise.resolve(data.find((iss) => iss.Id === id));
  }

  remove(domainObject: Issue): Promise<undefined> {
    let data = this.storage.GetStoredObject();
    const ind = data.some((el) => el.Id === domainObject.Id);

    if (!ind) {
      return Promise.resolve(undefined);
    }

    data = data.filter((iss) => iss.Id !== domainObject.Id);
    this.storage.SaveArrayObject(data);
    return Promise.resolve(undefined);
  }

  update(domainObject: Issue): Promise<Issue | undefined> {
    let data = this.storage.GetStoredObject();

    const ind = data.some((el) => el.Id === domainObject.Id);

    if (!ind) {
      return Promise.resolve(undefined);
    }

    data = data.filter((iss) => iss.Id !== domainObject.Id);
    this.storage.SaveArrayObject(data);
    return Promise.resolve(domainObject);
  }
}
