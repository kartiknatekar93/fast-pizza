import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/CartSlice";
import userReducer from "./features/user/userSlice";

export const rootReducer = combineReducers({
  cartStore: cartReducer,
  userStore: userReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
