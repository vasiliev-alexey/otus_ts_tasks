import { IssueRepository } from './IssueRepository';
import { Storage } from '../storage/Storage';
import { Issue, IssueStatus } from '../model/Issue';
import { mocked } from 'ts-jest/utils';

describe('Test suit IssueRepository Repository', function () {
  let SampleData: Issue[] = [];

  const dateTime = new Date();

  let testedClassDependencyMock: Storage<Issue>;

  beforeEach(() => {
    SampleData = [];

    testedClassDependencyMock = mocked({
      getStoredObject: jest.fn().mockResolvedValue(SampleData),
      saveArrayObject: jest.fn().mockResolvedValue({}),
      saveSingleObject: jest.fn().mockResolvedValue({}),
    }) as Storage<Issue>;

    for (let i = 0; i < 10; i++) {
      let tmpIssue = new Issue();
      tmpIssue.Id = i;
      tmpIssue.Title = 'a'.repeat(i);
      if (i % 3 === 0) {
        tmpIssue.Status = IssueStatus.NEW;
      }

      if (i % 5 === 0) {
        tmpIssue.Tags.push('TS');
      }

      if (i % 4 === 0) {
        tmpIssue.IssueDate = dateTime;
      }

      SampleData.push(tmpIssue);
    }
  });

  it('Repository should be a function', function () {
    expect(IssueRepository).toBeInstanceOf(Function);
  });

  it('Repository find by ID', async () => {
    const repo = new IssueRepository(testedClassDependencyMock);
    let tmpIssue = await repo.findById(1);

    expect(tmpIssue).not.toBeUndefined();
    expect(tmpIssue?.Id).toEqual(1);
    expect(testedClassDependencyMock.getStoredObject).toHaveBeenCalledTimes(1);
    tmpIssue = await repo.findById(99);
    expect(tmpIssue).toBeUndefined();
  });

  it('Repository  should delete item', async () => {
    const repo = new IssueRepository(testedClassDependencyMock);
    const removeIssue = new Issue();
    removeIssue.Id = 1;
    await repo.remove(removeIssue);

    const resultArray = SampleData.filter((el) => el.Id != 1);
    expect(testedClassDependencyMock.saveArrayObject).toHaveBeenCalledTimes(1);
    expect(testedClassDependencyMock.saveArrayObject).toHaveBeenCalledWith(
      resultArray
    );
  });

  it('Repository  should update item', async () => {
    const repo = new IssueRepository(testedClassDependencyMock);
    const updIssue = new Issue();
    updIssue.Id = 1;

    let resultArray = SampleData.filter((el) => el.Id !== 1);
    resultArray.push(updIssue);
    await repo.update(updIssue);
    expect(testedClassDependencyMock.saveArrayObject).toHaveBeenCalledTimes(1);
    expect(testedClassDependencyMock.saveArrayObject).toHaveBeenCalledWith(
      resultArray
    );
  });

  it('Repository  should create item', async () => {
    const repo = new IssueRepository(testedClassDependencyMock);
    const create = new Issue();
    create.Title = '22';
    await repo.create(create);
    expect(testedClassDependencyMock.saveSingleObject).toHaveBeenCalledTimes(1);
    expect(testedClassDependencyMock.saveSingleObject).toHaveBeenCalledWith(
      create
    );
  });

  it('Repository  should find by title', async () => {
    const repo = new IssueRepository(testedClassDependencyMock);
    const title = 'aaa';

    const issueList = await repo.filterByTitle(title);
    expect(issueList.length).toEqual(1);
    expect(issueList[0].Id).toEqual(3);
    expect(testedClassDependencyMock.getStoredObject).toHaveBeenCalledTimes(1);
  });

  it('Repository  should find by status', async () => {
    const repo = new IssueRepository(testedClassDependencyMock);
    const issueList = await repo.filterByStatus(IssueStatus.NEW);
    expect(issueList.length).toEqual(4);
    expect(issueList[0].Id).toEqual(0);
    expect(testedClassDependencyMock.getStoredObject).toHaveBeenCalledTimes(1);
  });

  it('Repository  should find by dateTime', async () => {
    const repo = new IssueRepository(testedClassDependencyMock);
    const issueList = await repo.filterByDate(dateTime);
    expect(issueList.length).toEqual(3);
    expect(issueList[0].IssueDate).toEqual(dateTime);
    expect(testedClassDependencyMock.getStoredObject).toHaveBeenCalledTimes(1);
  });

  it('Repository  should find by Tags', async () => {
    const repo = new IssueRepository(testedClassDependencyMock);
    const issueList = await repo.findByTags('TS');

    expect(issueList.length).toEqual(2);
    expect(issueList[0].Tags).toEqual(['TS']);
    expect(testedClassDependencyMock.getStoredObject).toHaveBeenCalledTimes(1);
  });
});
