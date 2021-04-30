import { Issue } from '../model/Issue';
import { LocalStorage } from './LocalStorageService';
import LocalStorageService = LocalStorage.LocalStorageService;
import IssueLocalStorageService = LocalStorage.IssueLocalStorageService;

describe('Test suit LocalStorageService', function () {
  beforeEach(() => {
    localStorage.clear();
  });

  it('class should by function', function () {
    expect(LocalStorageService).toBeInstanceOf(Function);
    expect(IssueLocalStorageService).toBeInstanceOf(Function);
  });

  it('LocalStorageRepository should save and get Data[]', function () {
    const localStorage = new IssueLocalStorageService();
    let issue = new Issue();
    issue.Id = Math.trunc(Math.random() * 10000);
    issue.Title = `data ${Math.random() * 3}`;
    issue.IssueDate = new Date(Math.random());
    localStorage.SaveArrayObject([issue]);
    const data = localStorage.GetStoredObject();
    expect(data).not.toBeNull();
    expect(data).toEqual([issue]);
  });

  it('LocalStorageRepository should save single', function () {
    const localStorage = new IssueLocalStorageService();
    let issue = new Issue();
    issue.Id = Math.trunc(Math.random() * 10000);
    issue.Title = `data ${Math.random() * 3}`;
    issue.IssueDate = new Date(Math.random());
    localStorage.SaveSingleObject(issue);
    const data = localStorage.GetStoredObject();
    expect(data).not.toBeNull();
    expect(data.length).toEqual(1);
    expect(data[0]).toEqual(issue);
  });
});
