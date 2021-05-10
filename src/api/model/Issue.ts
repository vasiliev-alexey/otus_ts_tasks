import { DomainObject } from './DomainObject';

export enum IssueStatus {
  NEW = 'New',
  CANCELED = 'Canceled',
}

export class Issue extends DomainObject {
  public Id: Number;
  public Title: string;
  public IssueDate: Date;
  public Status: IssueStatus;
  public Tags: string[] = [];
}
