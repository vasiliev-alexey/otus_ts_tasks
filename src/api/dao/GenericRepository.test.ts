import { IssueRepository } from './IssueRepository';
import { AbstractStorage } from '../storage/AbstractStorage';
import { Issue } from '../model/Issue';
import { mocked } from 'ts-jest/utils';

describe('Test suit IssueRepository Repository', function () {
  let SampleData: Issue[] = [];

  let testedClassDependencyMock: AbstractStorage<Issue>;

  beforeEach(() => {
    testedClassDependencyMock = (mocked({
      GetStoredObject: jest.fn(() => {
        return SampleData;
      }),
      SaveArrayObject: jest.fn(() => {}),
    }) as unknown) as AbstractStorage<Issue>;

    for (let i = 0; i < 10; i++) {
      let tmpIssue = new Issue();
      tmpIssue.Id = i;
      SampleData.push(tmpIssue);
    }
  });

  it('Repository should be a function', function () {
    expect(IssueRepository).toBeInstanceOf(Function);
  });

  it('Repository find by ID', function () {
    expect(IssueRepository).toBeInstanceOf(Function);

    let repo = new IssueRepository(testedClassDependencyMock);
    let tmpIssue = repo.findById(1);

    expect(tmpIssue).not.toBeUndefined();
    expect(tmpIssue?.Id).toEqual(1);
    expect(testedClassDependencyMock.GetStoredObject).toHaveBeenCalledTimes(1);
    tmpIssue = repo.findById(99);
    expect(tmpIssue).toBeUndefined();
  });

  it('Repository  should delete item', function () {
    let repo = new IssueRepository(testedClassDependencyMock);
    const removeIsssue: Issue = new Issue();
    removeIsssue.Id = 1;
    repo.remove(removeIsssue);
    expect(testedClassDependencyMock.SaveArrayObject).toHaveBeenCalledTimes(1);
  });

  it('Repository  should update item', function () {
    let repo = new IssueRepository(testedClassDependencyMock);
    const updIssue: Issue = new Issue();
    updIssue.Id = 1;
    repo.update(updIssue);
    expect(testedClassDependencyMock.SaveArrayObject).toHaveBeenCalledTimes(1);
  });
});
