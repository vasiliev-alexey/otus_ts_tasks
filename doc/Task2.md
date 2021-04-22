##### Задание к TypeScript: Part 2 будет проверять ваше умение использовать и вычислять типы

#### Все задания устроены таким образом что в них есть тип FIXME (который any) и ваша задача избавится от него

Менять код кроме типов нельзя, исходные типы менять тоже нельзя, но можно рефакторить
Например

```ts
type A = 1 | 2;
```

выразить как

```ts
type A1 = 1;
type A2 = 2;
type A = A1 | A2;
```

---

В функцию приходит массив состояний заказа и фильтруется
Нужно заменить FIXME на тип который вычисляется на основе OrderState

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = any;

const orderStates = [
  'initial',
  'inWork',
  'buyingSupplies',
  'producing',
  'fullfilled',
] as const;

type OrderState = typeof orderStates[number];

export const getUserOrderStates = (orderStates: OrderState[]): FIXME => {
  const filteredStates = [] as FIXME;
  orderStates.forEach((element) => {
    if (element !== 'buyingSupplies' && element !== 'producing') {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};
```

---

Есть объединение (юнион) типов заказов в различных состояниях
Нужно заменить FIXME на тип который достанет из Order все возможные состояния (state)

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = any;

type Order =
  | {
      state: 'initial';
      sum: number;
    }
  | {
      state: 'inWork';
      sum: number;
      workerId: number;
    }
  | {
      state: 'buyingSupplies';
      sum: number;
      workerId: number;
      suppliesSum: number;
    }
  | {
      state: 'producing';
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
    }
  | {
      state: 'fullfilled';
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
      fullfillmentDate: Date;
    };

export const getOrderState = (order: Order): FIXME => order.state;
```

---

Есть общая функция omit которая удаляет поле из объекта и возвращает его без этого поля
Нужно заменить FIXME на соответствующий тип

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const omit = <T extends Record<any, any>, K extends keyof T>(
  obj: T,
  keyToOmit: K
): FIXME => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { [keyToOmit]: _, ...withoutKey } = obj;
  return withoutKey;
};
```

---

Есть объединение (юнион) типов заказов в различных состояниях
и функция filterOnlyInitialAndInWorkOrder которая принимает заказы в любых состояниях
А возвращает только initial и inWork
Нужно заменить FIXME на правильный тип вычисленный на основе Order

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = any;

type Order =
  | {
      state: 'initial';
      sum: number;
    }
  | {
      state: 'inWork';
      sum: number;
      workerId: number;
    }
  | {
      state: 'buyingSupplies';
      sum: number;
      workerId: number;
      suppliesSum: number;
    }
  | {
      state: 'producing';
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
    }
  | {
      state: 'fullfilled';
      sum: number;
      workerId: number;
      suppliesSum: number;
      produceEstimate: Date;
      fullfillmentDate: Date;
    };

export const filterOnlyInitialAndInWorkOrder = (order: Order): FIXME => {
  if (order.state === 'initial' || order.state === 'inWork') {
    return order;
  }

  return null;
};
```

---

Есть функция которая достает из реакт компонента (любого, и Functional и Class) его defaultProps
Нужно заменить FIXME на правильный тип

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = any;

// Hint: infer
export const getDefaultProps = <T>(
  component: React.ComponentType<T>
): FIXME => {
  return component.defaultProps;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = any;

const orderStates = [
  'initial',
  'inWork',
  'buyingSupplies',
  'producing',
  'fullfilled',
] as const;

type OrderState = typeof orderStates[number];

// Hint: type guards
export const getUserOrderStates = (orderStates: OrderState[]): FIXME =>
  orderStates.filter(
    (state) => state !== 'buyingSupplies' && state !== 'producing'
  );
```

---

Задача состоит в том что написать калькулято для натуральных чисел, но только на типах!
Ниже приведена заготовка
Хочется поддержки сложения и вычитания, если хочется еще челленджа, то деление и умножение
Из-за ограничений глубины вычислений поддержать все натуральные числа не получится, это нормально

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FIXME = any;

type Equals<A, B> = A extends B ? (B extends A ? 'success' : never) : never;

type Add<A, B> = FIXME;
type Subtract<A, B> = FIXME;

export type OnePlusOneTest = Equals<Add<1, 1>, 2>;
export type TwoMinusOneTest = Equals<Subtract<2, 1>, 1>;
```
