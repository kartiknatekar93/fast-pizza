import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    incrementItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decrementItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
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

export const getCart = (state) => state.cartStore.cart;
export const getTotalPrice = (state) =>
  state.cartStore.cart.reduce((acc, item) => acc + item.totalPrice, 0);

export const getTotalQuantity = (state) =>
  state.cartStore.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cartStore.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
export default cartSlice.reducer;
