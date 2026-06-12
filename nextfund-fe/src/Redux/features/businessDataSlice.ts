import { createSlice } from "@reduxjs/toolkit";

export interface BusinessDataState {
  // Add your state properties here
}

const initialState: BusinessDataState = {
  // Add your initial state here
};

const businessDataSlice = createSlice({
  name: "businessData",
  initialState,
  reducers: {
    // Add your reducers here
  },
});

export const {
  // Add your exported actions here
} = businessDataSlice.actions;
export default businessDataSlice.reducer;


