import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "./interface";

const initialState: AuthState = {
  isLogin: false,
  showLoginModal: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoginState(state, action: PayloadAction<boolean>) {
      state.isLogin = action.payload;
    },
    setLoginModalState(state, action: PayloadAction<boolean>) {
      state.showLoginModal = action.payload;
    },
  },
});

export const { setLoginState, setLoginModalState } = authSlice.actions;
export default authSlice.reducer;
