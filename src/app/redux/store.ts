import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import basketSlice from "./slices/basket/basketSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    basket: basketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
