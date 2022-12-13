import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from "../store";
export interface AuthStatus {
  name: string | null;
  token: string | null;
}

const initialState: AuthStatus = {
  name: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    singIn: (state, action: PayloadAction<AuthStatus>) => {
      console.log("2222", action);
      state.name = action.payload.name;
      state.token = action.payload.token;
    },
    singOut: (state) => {
      state.name = null;
      state.token = null;
    },
  },
});

export const { singIn, singOut } = authSlice.actions;

export const selectName = (state: AppState) => state.auth.name;
export const selectToken = (state: AppState) => state.auth.token;

export default authSlice.reducer;
