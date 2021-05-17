import { DomainRepository, IssueFinder } from './DomainRepository';
import { Issue, IssueStatus } from '../model/Issue';
import { Storage } from '../storage/Storage';

export class IssueRepository implements DomainRepository<Issue>, IssueFinder {
  private storage: Storage<Issue>;

  constructor(storage: Storage<Issue>) {
    this.storage = storage;
  }

  async filterByTitle(Title: string): Promise<Issue[]> {
    return this.filterBy((i) => i.Title === Title);
  }

  async filterByStatus(Status: IssueStatus): Promise<Issue[]> {
    return this.filterBy((i) => i.Status === Status);
  }

  async filterByDate(IssueDate: Date): Promise<Issue[]> {
    return this.filterBy((i) => i.IssueDate === IssueDate);
  }

  async findByTags(Tag: string): Promise<Issue[]> {
    return this.filterBy(
      (i) => i.Tags?.length > 0 && i.Tags.some((t) => t === Tag)
    );
  }

  private async filterBy(predicate: (val: Issue) => boolean): Promise<Issue[]> {
    let data = await this.storage.getStoredObject();
    return data.filter((d) => {
      return predicate(d);
    });
  }

  async create(domainObject: Issue): Promise<Issue> {
    if (domainObject.Id !== undefined) {
      throw new Error('object can not be persist');
    }
    await this.storage.saveSingleObject(domainObject);
    return domainObject;
  }

  async findById(id: Number): Promise<Issue | undefined> {
    let data = await this.storage.getStoredObject();
    return data.find((iss) => iss.Id === id);
  }

  async remove(domainObject: Issue): Promise<undefined> {
    let data = await this.storage.getStoredObject();
    const ind = data.some((el) => el.Id === domainObject.Id);

    if (ind) {
      data = data.filter((iss) => iss.Id !== domainObject.Id);
      await this.storage.saveArrayObject(data);
    }
    return undefined;
  }

  async update(domainObject: Issue): Promise<Issue | undefined> {
    let data = await this.storage.getStoredObject();

    const ind = data.some((el) => el.Id === domainObject.Id);

    if (!ind) {
      return undefined;
    }

    data = data.filter((iss) => iss.Id !== domainObject.Id);
    data.push(domainObject);
    await this.storage.saveArrayObject(data);
    return domainObject;
  }
}
