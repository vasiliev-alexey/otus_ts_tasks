import { Issue } from '../model/Issue';
import { LocalStorage } from './LocalStorageService';

describe('Test suit LocalStorageService', function () {
  let localStorageService: LocalStorage.IssueLocalStorageService;

  beforeEach(() => {
    localStorage.clear();
    localStorageService = new LocalStorage.IssueLocalStorageService();
  });

  it('class should by function', function () {
    expect(LocalStorage.IssueLocalStorageService).toBeInstanceOf(Function);
  });

  it('LocalStorageRepository should save and get Data[]', async function () {
    let issue = new Issue();
    issue.Id = Math.trunc(Math.random() * 10000);
    issue.Title = `data ${Math.random() * 3}`;
    issue.IssueDate = new Date(Math.random());
    await localStorageService.saveArrayObject([issue]);
    const data = await localStorageService.getStoredObject();
    expect(data).not.toBeNull();
    expect(data).toEqual([issue]);
  });

  it('LocalStorageRepository should save single', async function () {
    let issue = new Issue();
    issue.Id = Math.trunc(Math.random() * 10000);
    issue.Title = `data ${Math.random() * 3}`;
    issue.IssueDate = new Date(Math.random());
    await localStorageService.saveSingleObject(issue);
    const data = await localStorageService.getStoredObject();
    expect(data).not.toBeNull();
    expect(data.length).toEqual(1);
    expect(data[0]).toEqual(issue);
  });
});
