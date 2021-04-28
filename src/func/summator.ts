export function sum(a: number = 0) {
  let currentSum = a;
  function f(b: number) {
    currentSum += b;
    return f;
  }

  f.toString = function () {
    return Number(currentSum);
  };

  return f;
}
