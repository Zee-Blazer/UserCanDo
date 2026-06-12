import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cookies } from "next/headers";

export interface iUserProfile {
	access_token: string;
	refresh_token: string;
	role: string;
	user_id?: string;
}

export interface AuthState {
	isLoggedIn: boolean;
	user: iUserProfile | null;
}

const initialState: AuthState = {
	isLoggedIn: false,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, { payload }) => {
			state.isLoggedIn = true;
			state.user = { ...state.user, ...payload };
		},
		logUserOut: (state) => {
			state.isLoggedIn = false;
			state.user = null;
		},
		setUserProfile: (state, { payload }) => {
			state.user = { ...state.user, ...payload };
		},
	},
});

export const { login, logUserOut, setUserProfile } = authSlice.actions;
export default authSlice.reducer;
