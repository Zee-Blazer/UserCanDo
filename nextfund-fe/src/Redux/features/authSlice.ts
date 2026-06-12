import { createSlice } from "@reduxjs/toolkit";
import { initialLoginData, initialLoginForm } from "../../utils/initialStates";
import { LoginApiData, LoginForm } from "./authSlice.d";

export interface AuthState {
  isLoggedIn: boolean;
  loginData: LoginApiData;
  loginForm: LoginForm;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loginData: initialLoginData,
  loginForm: initialLoginForm,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logUserIn(state, action) {
      state.isLoggedIn = true;
      state.loginData = action.payload;
    },
    logUserOut(state) {
      state.isLoggedIn = false;
      state.loginData = initialLoginData;
    },
    setLoginForm(state, action) {
      state.loginForm = action.payload;
    },
    clearLoginForm(state) {
      state.loginForm = initialLoginForm;
    },
    updateLoginAvatar(state, action) {
      if (state.loginData) {
        state.loginData.avatar = action.payload;
      }
    },
  },
});

export const {
  logUserIn,
  logUserOut,
  setLoginForm,
  clearLoginForm,
  updateLoginAvatar,
} = authSlice.actions;
export default authSlice.reducer;
