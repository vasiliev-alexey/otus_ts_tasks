import { Issue } from '../model/Issue';
import { JSONDbStorage } from './JSONDbStorageService';

describe('Test suit LocalStorageService', function () {
  beforeEach(() => {
    localStorage.clear();
  });

  it('class should by function', function () {
    expect(JSONDbStorage.IssueJSONDbStorageService).toBeInstanceOf(Function);
  });

  it('LocalStorageRepository should save and get Data[]', function () {
    const localStorage = new JSONDbStorage.IssueJSONDbStorageService();
    const sampleData: Issue[] = [];
    for (let i = 0; i < 10; i++) {
      const issue = new Issue();
      issue.Id = Math.trunc(Math.random() * 10000);
      issue.Title = `data ${Math.random() * 3}`;
      issue.IssueDate = new Date(Math.random() * 1000 + i * 100);
      issue.IssueDate.setMilliseconds(0);

      sampleData.push(issue);
    }

    localStorage.SaveArrayObject(sampleData);
    const data = localStorage.GetStoredObject();
    expect(data).not.toBeNull();

    expect(data).toEqual(sampleData);
  });
});
