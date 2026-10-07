import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store.ts";

export interface cartItem {
  pizzaId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface cartState {
  cart: cartItem[];
}

const initialState: cartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<cartItem>) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action: PayloadAction<string>) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    incrementItemQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decrementItemQuantity(state, action: PayloadAction<string>) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      if (!item) return;
      item.quantity--;

      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  incrementItemQuantity,
  decrementItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getCart = (state: RootState) => state.cartStore.cart;
export const getTotalPrice = (state: RootState): number =>
  state.cartStore.cart.reduce((acc, item) => acc + item.totalPrice, 0);

export const getTotalQuantity = (state: RootState): number =>
  state.cartStore.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getCurrentQuantityById =
  (id: string) =>
  (state: RootState): number =>
    state.cartStore.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
export default cartSlice.reducer;
