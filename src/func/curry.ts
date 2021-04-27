// export function curry(fn: Function, ...args: number[]) {
//   return function (...partArg: number[]) {
//     const allArgs = args.concat(partArg);
//     if (allArgs.length >= fn.length) {
//       return fn(...allArgs);
//     } else {
//       return curry(fn, ...allArgs);
//     }
//   };
// }
//
type PartialArgs<T extends (...args: number[]) => number> = T extends (
  ...args: infer TArgs
) => number
  ? Partial<number[]>
  : never;

type Curried<T extends (...args: any) => any, TReturn = ReturnType<T>> =
  /* Декларируем функции */
  <TArgs extends PartialArgs<T>, TRest extends number[]>(
    ...args: TArgs
  ) => TRest extends []
    ? TReturn /* если оастаточне параметры пусты
      - выдаем фунцию с вычислением результата*/
    : Curried<(...args2: number[]) => TReturn>;
/* иначе заворачиваем функцию еще  раз */

/*типизируем возвращаемое значение через выведения типа - или функция для вызова след аргумента
 или число от вычисления*/
export function curry<TFunc extends (...args: number[]) => number>(
  func: TFunc
): Curried<TFunc>;

export function curry(fn: (...args: number[]) => number): any {
  const arity = fn.length;

  return function carred(...args: number[]) {
    if (args.length >= arity) {
      return fn(...args);
    }
    return function f2(...moreArgs: number[]) {
      return carred(...args.concat(moreArgs));
    };
  };
}
