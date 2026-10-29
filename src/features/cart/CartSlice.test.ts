import { describe, it, expect } from "vitest";

import reducer, {
  addItem,
  deleteItem,
  incrementItemQuantity,
  decrementItemQuantity,
  clearCart,
  getCart,
  getTotalPrice,
  getTotalQuantity,
  getCurrentQuantityById,
  type cartItem,
} from "./CartSlice";

import type { RootState } from "../../store";

// ---------- test data helpers ----------
const margherita: cartItem = {
  pizzaId: "1",
  name: "Margherita",
  quantity: 1,
  unitPrice: 10,
  totalPrice: 10,
};

const pepperoni: cartItem = {
  pizzaId: "2",
  name: "Pepperoni",
  quantity: 2,
  unitPrice: 15,
  totalPrice: 30,
};

const makeRootState = (cart: cartItem[]) =>
  ({ cartStore: { cart } }) as unknown as RootState;

//reducers

describe("cartSlice Reducers", () => {
  it("returns the initial state (empty cart)", () => {
    const state = reducer(undefined, { type: "unknown" });
    expect(state).toEqual({ cart: [] });
  });

  it("adds item to the cart", () => {
    const state = reducer({ cart: [] }, addItem(margherita));
    expect(state.cart).toEqual([margherita]);
  });

  it("deleteitem removes only the maching id", () => {
    const state = reducer({ cart: [margherita, pepperoni] }, deleteItem("1"));
    expect(state.cart).toEqual([pepperoni]);
  });

  it("incrementitemquantity increases quantity and recalculates totalprices", () => {
    const state = reducer({ cart: [margherita] }, incrementItemQuantity("1"));
    expect(state.cart[0].quantity).toBe(2);
    expect(state.cart[0].totalPrice).toBe(20);
  });

  it("decrementItemQuantity decreases quantity and recalculates totalPrice", () => {
    const state = reducer({ cart: [pepperoni] }, decrementItemQuantity("2"));
    expect(state.cart[0].quantity).toBe(1);
    expect(state.cart[0].totalPrice).toBe(15);
  });

  it("decrementItemQuantity when the quantity is zero then the item will be removed", () => {
    const state = reducer({ cart: [margherita] }, decrementItemQuantity("1"));
    expect(state.cart).toHaveLength(0);
  });

  it("increment/decrement do nothing for an id that is not in the cart", () => {
    const initial = { cart: [margherita] };
    expect(reducer(initial, incrementItemQuantity("999"))).toEqual(initial);
  });

  it("clearCart empties the cart", () => {
    const state = reducer({ cart: [margherita, pepperoni] }, clearCart());
    expect(state.cart).toEqual([]);
  });

  it("does not mutate the prevoius state", () => {
    const initial = { cart: [{ ...margherita }] };
    reducer(initial, incrementItemQuantity("1"));
    expect(initial.cart[0].quantity).toBe(1);
  });
});

// ---------- selectors ----------
describe("cartSlice selectors", () => {
  const state = makeRootState([margherita, pepperoni]);

  it("getCart returns the cart array", () => {
    expect(getCart(state)).toEqual([margherita, pepperoni]);
  });

  it("getTotalPrice sums totalPrice of all items", () => {
    expect(getTotalPrice(state)).toBe(40); // 10 + 30
  });

  it("getTotalQuantity sums quantity of all items", () => {
    expect(getTotalQuantity(state)).toBe(3); // 1 + 2
  });

  it("getCurrentQuantityById returns the quantity for an existing pizza", () => {
    expect(getCurrentQuantityById("2")(state)).toBe(2);
  });

  it("getCurrentQuantityById returns 0 for a pizza not in the cart", () => {
    expect(getCurrentQuantityById("999")(state)).toBe(0);
  });

  it("totals are 0 for an empty cart", () => {
    const empty = makeRootState([]);
    expect(getTotalPrice(empty)).toBe(0);
    expect(getTotalQuantity(empty)).toBe(0);
  });
});
