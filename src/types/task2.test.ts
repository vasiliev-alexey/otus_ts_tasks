import { FIXME, getOrderState, Order } from './task2';
import { expectAssignable, expectNotAssignable, expectType } from 'tsd';

describe('test2 function', function () {
  it('getUserOrderStates function should return type of  FIXMУ without Error', function () {
    let initialOrder: Order = {
      state: 'initial',
      sum: 999,
    };

    expectType<Order['state']>(getOrderState(initialOrder));
    expectType<FIXME>(getOrderState(initialOrder));

    expectAssignable<FIXME>('initial');
    expectAssignable<FIXME>('fullfilled');
    expectNotAssignable<FIXME>('expectNotAssignable');
  });
});
