import { IssueRepository } from './IssueRepository';
import { AbstractStorage } from '../storage/AbstractStorage';
import { Issue, IssueStatus } from '../model/Issue';
import { mocked } from 'ts-jest/utils';

describe('Test suit IssueRepository Repository', function () {
  let SampleData: Issue[] = [];

  const dateTime = new Date();

  let testedClassDependencyMock: AbstractStorage<Issue>;

  beforeEach(() => {

    SampleData = [];

    testedClassDependencyMock = (mocked({
      GetStoredObject: jest.fn(() => {
        return SampleData;
      }),
      SaveArrayObject: jest.fn(() => {}),
      SaveSingleObject: jest.fn(() => {}),
    }) as unknown) as AbstractStorage<Issue>;

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
    expect(IssueRepository).toBeInstanceOf(Function);

    let repo = new IssueRepository(testedClassDependencyMock);
    let tmpIssue = await repo.findById(1);

    expect(tmpIssue).not.toBeUndefined();
    expect(tmpIssue?.Id).toEqual(1);
    expect(testedClassDependencyMock.GetStoredObject).toHaveBeenCalledTimes(1);
    tmpIssue = await repo.findById(99);
    expect(tmpIssue).toBeUndefined();
  });

  it('Repository  should delete item', async () => {
    let repo = new IssueRepository(testedClassDependencyMock);
    const removeIsssue: Issue = new Issue();
    removeIsssue.Id = 1;
    await repo.remove(removeIsssue);
    expect(testedClassDependencyMock.SaveArrayObject).toHaveBeenCalledTimes(1);
  });

  it('Repository  should update item', async () => {
    let repo = new IssueRepository(testedClassDependencyMock);
    const updIssue: Issue = new Issue();
    updIssue.Id = 1;
    await repo.update(updIssue);
    expect(testedClassDependencyMock.SaveArrayObject).toHaveBeenCalledTimes(1);
  });

  it('Repository  should create item', async () => {
    let repo = new IssueRepository(testedClassDependencyMock);
    const create: Issue = new Issue();
    create.Title = '22';
    await repo.create(create);
    expect(testedClassDependencyMock.SaveSingleObject).toHaveBeenCalledTimes(1);
  });

  it('Repository  should find by title', async () => {
    let repo = new IssueRepository(testedClassDependencyMock);
    let title = 'aaa';
    // let pred : Function  =  (i: Issue) => {return i.Title = title };
    let t = await repo.findByTitle(title);
    expect(t.length).toEqual(1);
    expect(t[0].Id).toEqual(3);
    expect(testedClassDependencyMock.GetStoredObject).toHaveBeenCalledTimes(1);
  });

  it('Repository  should find by status', async () => {
    let repo = new IssueRepository(testedClassDependencyMock);
    let t = await repo.findByStatus(IssueStatus.NEW);
    expect(t.length).toEqual(4);
    expect(t[0].Id).toEqual(0);
    expect(testedClassDependencyMock.GetStoredObject).toHaveBeenCalledTimes(1);
  });

  it('Repository  should find by dateTime', async () => {
    let repo = new IssueRepository(testedClassDependencyMock);
    let t = await repo.findByDate(dateTime);
    expect(t.length).toEqual(3);
    expect(t[0].IssueDate).toEqual(dateTime);
    expect(testedClassDependencyMock.GetStoredObject).toHaveBeenCalledTimes(1);
  });

  it('Repository  should find by Tags', async () => {
    let repo = new IssueRepository(testedClassDependencyMock);
    let t = await repo.findByTags('TS');

    expect(t.length).toEqual(2);
    expect(t[0].Tags).toEqual(['TS']);
    expect(testedClassDependencyMock.GetStoredObject).toHaveBeenCalledTimes(1);
  });
});
