import { DomaiObject } from './DomaiObject';

export enum IssueStatus {
  NEW = 'New',
  CANCELED = 'Canceled',
}

export class Issue extends DomaiObject {
  public Id: Number;
  public Title: string;
  public IssueDate: Date;
  public Status: IssueStatus;
  public Tags: string[] = [];
}
