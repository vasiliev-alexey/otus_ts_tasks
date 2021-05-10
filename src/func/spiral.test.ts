import { spiral } from './spiral';

describe('test spiral function', function () {
  it('spiral test', function () {
    let arr = spiral([
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
    ]);

    expect(arr).toEqual([
      0, 1, 2, 3, 4, 9, 14, 19, 18, 17, 16, 15, 10, 5, 6, 7, 8, 13, 12, 11,
    ]);

    let arr3 = spiral([
      [0, 1, 2],
      [7, 8, 3],
      [6, 5, 4],
    ]);
    console.log(arr3);
    expect(arr3).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8]);
  });
});
