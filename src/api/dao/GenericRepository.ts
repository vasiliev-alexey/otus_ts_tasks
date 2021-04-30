import { DomaiObject } from '../model/DomaiObject';
import { Issue, IssueStatus } from '../model/Issue';

export interface GenericRepository<T extends DomaiObject> {
  findById(id: Number): Promise<Issue | undefined>;

  remove(domainObject: T): Promise<undefined>;

  update(domainObject: T): Promise<Issue | undefined>;

  create(domainObject: T): Promise<T>;

  // findBy(predicate :( val: T) => boolean): Promise<T[]>;
}
export interface IssueFinder {
  findByTitle(Title: string): Promise<Issue[]>;
  findByStatus(Status: IssueStatus): Promise<Issue[]>;
  findByDate(IssueDate: Date): Promise<Issue[]>;
}
