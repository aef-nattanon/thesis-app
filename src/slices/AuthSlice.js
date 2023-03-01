import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    singIn: (state, action) => {
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

export const selectName = (state) => state.auth.name;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;
