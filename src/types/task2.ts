export type Order =
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

export type FIXME =  Order['state'];

export const getOrderState = (order: Order): FIXME => order.state;
