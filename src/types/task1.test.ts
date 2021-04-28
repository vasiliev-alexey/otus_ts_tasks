import { FIXME, getUserOrderStates, orderStates } from './task1';
import { expectAssignable, expectNotAssignable, expectType } from 'tsd';

describe('test1 function', function () {
  it('getUserOrderStates function should return type of  FIXMУ without Error', function () {
    expectType<FIXME>(getUserOrderStates([]));

    expectAssignable<FIXME>([
      'initial',
      'inWork',
      //   "buyingSupplies",
      //  "producing",
      'fullfilled',
    ]);

    const t = orderStates.find(
      (el) => el === 'buyingSupplies'
    ) as typeof orderStates[number];
    expectNotAssignable<FIXME>(t);
  });
});
