import { omit } from './task3';
import { expectError, expectNotAssignable } from 'tsd';
import { FIXME } from './task3';

describe('test3 ', function () {
  it('no test defined', function () {
    const randomFieldNumber: number = Math.floor(Math.random() * 100);
    type testType = Record<string | number, any>;
    let dummyObject: testType = {
      data1: 12,
      data2: undefined,
      randomFieldNumber: 13,
    };

    let omitType = omit<testType, number>(dummyObject, 111);

    expect(randomFieldNumber in omitType).toBe(false);
    expect('data1' in omitType).toBe(true);
    expect('data2' in omitType).toBe(true);

    omitType = omit<testType, string>(dummyObject, 'data1');
    expect('data1' in omitType).toBe(false);
  });
});
