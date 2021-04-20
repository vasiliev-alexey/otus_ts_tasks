import { curry } from './curry';
import { anyFunction } from 'jest-mock-extended';

describe('test curry function', function () {
  it('curry test', function () {
    const func = (a: number, b: number, c: number, d: number, e: number) =>
      a + b + c + d + e;
    const hof = curry(func);

    expect(hof(1)(2)(3)(4)(5)).toEqual(15);
    expect(hof(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)).toEqual(5); // лишние будут отброшены сигнатурой функции
    expect(hof(2, 3, 4)(5, 6)).toEqual(20);
    expect(hof(3, 4)(5, 6)(7)).toEqual(25);
    expect(hof(4, 5)(6)(7, 8)).toEqual(30);
    expect(hof(5)(6)(7)(8)(9)).toEqual(35);
    expect(hof(5)(6)).toEqual(anyFunction()); // при нехватке аргуметов будет возвращена частичная функция

    const multi = (a: number, b: number, c: number, d: number, e: number) =>
      a * b * c * d * e;
    const curryMulty = curry(multi);
    expect(curryMulty(1)(2)(3)(4)(5)).toEqual(120);
    expect(curryMulty(1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1)).toEqual(1);
    expect(curryMulty(2, 2)(2)(2, 2)).toEqual(32);
  });
});
