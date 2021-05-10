import { DomainObject } from '../model/DomainObject';
import { Issue, IssueStatus } from '../model/Issue';

export interface GenericRepository<T extends DomainObject> {
  findById(id: Number): Promise<Issue | undefined>;

  remove(domainObject: T): Promise<undefined>;

  update(domainObject: T): Promise<Issue | undefined>;

  create(domainObject: T): Promise<T>;
}
export interface IssueFinder {
  findByTitle(Title: string): Promise<Issue[]>;
  findByStatus(Status: IssueStatus): Promise<Issue[]>;
  findByDate(IssueDate: Date): Promise<Issue[]>;
}
