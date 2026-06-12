import { createSlice } from "@reduxjs/toolkit";
import { InvestorSignUpDetails, InvestorUserProfile } from "./investorSlice.d";

export interface InvestorState {
  investorUserProfile: InvestorUserProfile;
  investorSignUpDetails: InvestorSignUpDetails;
}

const initialInvestorUserProfile: InvestorUserProfile = {
  investor_id: "",
  user_id: "",
};

const initialInvestorSignUpDetails: InvestorSignUpDetails = {
  first_name: "",
  last_name: "",
  email: "",
  investor_type: "",
  investment_experience: "",
  password: "",
  avatar: "",
};

const initialState: InvestorState = {
  investorUserProfile: initialInvestorUserProfile,
  investorSignUpDetails: initialInvestorSignUpDetails,
};

const investorSlice = createSlice({
  name: "investor",
  initialState,
  reducers: {
    setInvestorUserProfile(state, action) {
      state.investorUserProfile = action.payload;
    },
    clearInvestorUserProfile(state) {
      state.investorUserProfile = initialInvestorUserProfile;
    },
    setInvestorSignUpDetails(state, { payload }) {
      // Merge payload with existing state to ensure all fields are preserved
      // This ensures avatar and other optional fields are not lost
      // If payload doesn't have avatar but existing state does, preserve it
      const existingAvatar = state.investorSignUpDetails?.avatar;

      state.investorSignUpDetails = {
        ...state.investorSignUpDetails,
        ...payload,
        // Explicitly preserve avatar if payload doesn't have one but existing state does
        avatar:
          payload?.avatar && payload.avatar.trim() !== ""
            ? payload.avatar
            : existingAvatar && existingAvatar.trim() !== ""
            ? existingAvatar
            : payload?.avatar || "",
      };
    },
    clearInvestorSignUpDetails(state) {
      state.investorSignUpDetails = initialInvestorSignUpDetails;
    },
  },
});

export const {
  setInvestorUserProfile,
  clearInvestorUserProfile,
  setInvestorSignUpDetails,
  clearInvestorSignUpDetails,
} = investorSlice.actions;
export default investorSlice.reducer;
