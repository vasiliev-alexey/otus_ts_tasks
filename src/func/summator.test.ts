import { sum } from './summator';

describe('test sum function', function () {
  it('sum test', function () {
    expect(sum().toString()).toBe(0);
    expect(sum(1).toString()).toBe(1);
    expect(sum(1)(2).toString()).toBe(3);
    expect(sum(3)(4)(5).toString()).toBe(12);
  });

  it('sum test sum3', function () {
    const s3 = sum(3);
    expect(s3(5).toString()).toBe(8);
    expect(s3(6).toString()).toBe(14);
  });
});
