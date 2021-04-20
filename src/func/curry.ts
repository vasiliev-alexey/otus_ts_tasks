export function curry(fn: Function, ...args: number[]) {
  return function (...partArg: number[]) {
    const allArgs = args.concat(partArg);
    if (allArgs.length >= fn.length) {
      return fn(...allArgs);
    } else {
      return curry(fn, ...allArgs);
    }
  };
}
