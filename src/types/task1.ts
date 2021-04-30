export const orderStates = [
  'initial',
  'inWork',
  'buyingSupplies',
  'producing',
  'fullfilled',
] as const;

export type FIXME = Array<
  Exclude<typeof orderStates[number], 'buyingSupplies' | 'producing'>
>;

type OrderState = typeof orderStates[number];

export const getUserOrderStates = (orderStatesInput: OrderState[]): FIXME => {
  const filteredStates = [] as FIXME;
  orderStatesInput.forEach((element) => {
    if (element !== 'buyingSupplies' && element !== 'producing') {
      filteredStates.push(element);
    }
  });
  return filteredStates;
};
