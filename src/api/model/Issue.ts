import { DomainObject } from './DomainObject';

export enum IssueStatus {
  NEW = 'New',
  CANCELED = 'Canceled',
}

export class Issue extends DomainObject {
  public Title: string;
  public IssueDate: Date;
  public Status: IssueStatus;
  public Tags: string[] = [];
}
