import { createSlice } from "@reduxjs/toolkit";

export interface DashboardState {
	items: any;
}

const initialState: DashboardState = {
	items: [],
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		setItems: (state, { payload }) => {
			state.items = payload;
		},
	},
});

export const { setItems } = dashboardSlice.actions;
export default dashboardSlice.reducer;
