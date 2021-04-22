import { FIXME, getUserOrderStates } from './task1';
import { expectAssignable, expectNotAssignable, expectType } from 'tsd';

describe('test1 function', function () {
  it('getUserOrderStates function should return type of  FIXMУ without Error', function () {
    expectType<FIXME>(getUserOrderStates([]));

    expectAssignable<FIXME>([
      'initial',
      'inWork',
      //  "buyingSupplies", -- cool
      //  "producing",
      'fullfilled',
    ]);

    expectNotAssignable<FIXME>(['buyingSupplies', 'initial', 'producing']);
  });
});
