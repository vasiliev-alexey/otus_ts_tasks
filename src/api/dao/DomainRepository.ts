import { DomainObject } from '../model/DomainObject';
import { Issue, IssueStatus } from '../model/Issue';

export interface DomainRepository<T extends DomainObject> {
  findById(id: Number): Promise<Issue | undefined>;

  remove(domainObject: T): Promise<undefined>;

  update(domainObject: T): Promise<Issue | undefined>;

  create(domainObject: T): Promise<T>;
}
export interface IssueFinder {
  filterByTitle(Title: string): Promise<Issue[]>;
  filterByStatus(Status: IssueStatus): Promise<Issue[]>;
  filterByDate(IssueDate: Date): Promise<Issue[]>;
}
