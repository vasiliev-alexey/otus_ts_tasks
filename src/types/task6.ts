export const orderStates = [
  'initial',
  'inWork',
  'buyingSupplies',
  'producing',
  'fullfilled',
] as const;

type OrderState = typeof orderStates[number];

export type FIXME = Exclude<OrderState, 'buyingSupplies' | 'producing'>[];

export const getUserOrderStates = (orderStatesParam: OrderState[]): FIXME =>
  // @ts-ignore
  orderStatesParam.filter(
    (state) => state !== 'buyingSupplies' && state !== 'producing'
  );
