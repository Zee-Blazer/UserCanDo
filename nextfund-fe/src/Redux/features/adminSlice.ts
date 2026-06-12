import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AdminFundingRecord,
  AllUsersDetails,
  DueDiligencePayloadItem,
  InvestmentPayload,
  TeamMemberDetails,
} from "../../types/queries-type";

export interface AdminUserProfile {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_verified: boolean;
  user_type: string;
  role: string;
  is_business: boolean;
  business_id: string;
}

interface AdminState {
  adminUserProfile: AdminUserProfile | null;
  activeDueDiligenceDetails: DueDiligencePayloadItem | null;
  activeUsersData: AllUsersDetails | null;
  activeInvestmentsData: InvestmentPayload | null;
  activeTeamMemberData: TeamMemberDetails | null;
  activeFundingData: AdminFundingRecord | null;
  allUsersData: AllUsersDetails[] | null; 
  currentUserIndex: number;
  allDueDiligenceData: DueDiligencePayloadItem[] | null;
  currentDueDiligenceIndex: number;
  allInvestmentsData: InvestmentPayload[] | null;
  currentInvestmentIndex: number;
}

const initialState: AdminState = {
  adminUserProfile: null,
  activeDueDiligenceDetails: null,
  activeUsersData: null,
  activeInvestmentsData: null,
  activeTeamMemberData: null,
  activeFundingData: null,
  allUsersData: null,
  currentUserIndex: 0,
  allDueDiligenceData: null,
  currentDueDiligenceIndex: 0,
  allInvestmentsData: null,
  currentInvestmentIndex: 0,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdminUserProfile: (state, action: PayloadAction<AdminUserProfile>) => {
      state.adminUserProfile = action.payload;
    },
    clearAdminUserProfile: (state) => {
      state.adminUserProfile = null;
    },
    setActiveDueDiligenceDetails: (
      state,
      action: PayloadAction<DueDiligencePayloadItem>
    ) => {
      state.activeDueDiligenceDetails = action.payload;
    },
    setActiveUsersData: (state, action: PayloadAction<AllUsersDetails>) => {
      state.activeUsersData = action.payload;
    },
    setAllUsersData: (state, action: PayloadAction<AllUsersDetails[]>) => {
      state.allUsersData = action.payload;
    },
    setActiveTeamMemberData: (state, action: PayloadAction<TeamMemberDetails>) => {
      state.activeTeamMemberData = action.payload;
    },
    setActiveFundingData: (state, action: PayloadAction<AdminFundingRecord>) => {
      console.log(action.payload);
      state.activeFundingData = action.payload;
    },
    setCurrentUserIndex: (state, action: PayloadAction<number>) => {
      state.currentUserIndex = action.payload;
    },
    navigateToNextUser: (state) => {
      if (state.allUsersData && state.currentUserIndex < state.allUsersData.length - 1) {
        state.currentUserIndex += 1;
        state.activeUsersData = state.allUsersData[state.currentUserIndex];
      }
    },
    navigateToPreviousUser: (state) => {
      if (state.allUsersData && state.currentUserIndex > 0) {
        state.currentUserIndex -= 1;
        state.activeUsersData = state.allUsersData[state.currentUserIndex];
      }
    },
    setAllDueDiligenceData: (state, action: PayloadAction<DueDiligencePayloadItem[]>) => {
      state.allDueDiligenceData = action.payload;
    },
    setCurrentDueDiligenceIndex: (state, action: PayloadAction<number>) => {
      state.currentDueDiligenceIndex = action.payload;
    },
    navigateToNextDueDiligence: (state) => {
      if (state.allDueDiligenceData && state.currentDueDiligenceIndex < state.allDueDiligenceData.length - 1) {
        state.currentDueDiligenceIndex += 1;
        state.activeDueDiligenceDetails = state.allDueDiligenceData[state.currentDueDiligenceIndex];
      }
    },
    navigateToPreviousDueDiligence: (state) => {
      if (state.allDueDiligenceData && state.currentDueDiligenceIndex > 0) {
        state.currentDueDiligenceIndex -= 1;
        state.activeDueDiligenceDetails = state.allDueDiligenceData[state.currentDueDiligenceIndex];
      }
    },
    setAllInvestmentsData: (state, action: PayloadAction<InvestmentPayload[]>) => {
      state.allInvestmentsData = action.payload;
    },
    setCurrentInvestmentIndex: (state, action: PayloadAction<number>) => {
      state.currentInvestmentIndex = action.payload;
    },
    navigateToNextInvestment: (state) => {
      if (state.allInvestmentsData && state.currentInvestmentIndex < state.allInvestmentsData.length - 1) {
        state.currentInvestmentIndex += 1;
        state.activeInvestmentsData = state.allInvestmentsData[state.currentInvestmentIndex];
      }
    },
    navigateToPreviousInvestment: (state) => {
      if (state.allInvestmentsData && state.currentInvestmentIndex > 0) {
        state.currentInvestmentIndex -= 1;
        state.activeInvestmentsData = state.allInvestmentsData[state.currentInvestmentIndex];
      }
    },
    setActiveInvestmentData: (state, action: PayloadAction<InvestmentPayload>) => {
      state.activeInvestmentsData = action.payload;
    }
  },
});

export const {
  setAdminUserProfile,
  clearAdminUserProfile,
  setActiveDueDiligenceDetails,
  setActiveUsersData,
  setActiveTeamMemberData,
  setActiveFundingData,
  setAllUsersData,
  setCurrentUserIndex,
  navigateToNextUser,
  navigateToPreviousUser,
  setAllDueDiligenceData,
  setCurrentDueDiligenceIndex,
  navigateToNextDueDiligence,
  navigateToPreviousDueDiligence,
  setAllInvestmentsData,
  setCurrentInvestmentIndex,
  navigateToNextInvestment,
  navigateToPreviousInvestment,
  setActiveInvestmentData,
} = adminSlice.actions;
export default adminSlice.reducer;
