import { FIXME, getUserOrderStates, orderStates } from './task6';
import { expectAssignable, expectNotAssignable, expectType } from 'tsd';

describe('test 6 function', function () {
  it('getUserOrderStates function should return type of  FIXMУ without Error', function () {
    expectType<FIXME>(getUserOrderStates([]));

    expectAssignable<FIXME>(['initial', 'inWork', 'fullfilled']);

    const t = orderStates.find(
      (el) => el === 'buyingSupplies'
    ) as typeof orderStates[number];
    expectNotAssignable<FIXME>(t);
  });
});
