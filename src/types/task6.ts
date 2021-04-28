// eslint-disable-next-line @typescript-eslint/no-explicit-any

export const orderStates = [
    "initial",
    "inWork",
    "buyingSupplies",
    "producing",
    "fullfilled",
] as const;

type OrderState = typeof orderStates[number];

export type FIXME = (Omit<OrderState, "buyingSupplies"|  "producing">)[];

// Hint: type guards
export const getUserOrderStates = (orderStates: OrderState[]): FIXME =>
    orderStates.filter(
        (state) => state !== "buyingSupplies" && state !== "producing"
    );