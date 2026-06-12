import { createSlice } from "@reduxjs/toolkit";
import {
  initialBusinessFormData,
  initialBusinessListingData,
  initialBusinessUserProfile,
  initialCompanyMetricsData,
  initialComplianceVerificationData,
  initialEssentialDocumentsData,
  initialFundingStructureData,
  initialInvestmentPreferencesData,
  initialUseOfFundsData,
} from "../../utils/initialStates";
import {
  BusinessFormData,
  BusinessListingData,
  BusinessUserProfile,
  CompanyMetricsData,
  ComplianceVerificationData,
  EssentialDocumentsData,
  FundingStructureData,
  InvestmentPreferencesData,
  UseOfFundsData,
} from "./businessSlice.d";

export interface BusinessState {
  businessUserProfile: BusinessUserProfile;
  businessFormData: BusinessFormData;
  fundingStructureData: FundingStructureData;
  companyMetricsData: CompanyMetricsData;
  useOfFundsData: UseOfFundsData;
  essentialDocumentsData: EssentialDocumentsData;
  complianceVerificationData: ComplianceVerificationData;
  investmentPreferencesData: InvestmentPreferencesData;
  businessListingData: BusinessListingData;
  currentStep: string;
  isListingComplete: boolean;
  listingId: string;
  isAccountCreated: boolean;
}

const initialState: BusinessState = {
  businessUserProfile: initialBusinessUserProfile,
  businessFormData: initialBusinessFormData,
  fundingStructureData: initialFundingStructureData,
  companyMetricsData: initialCompanyMetricsData,
  useOfFundsData: initialUseOfFundsData,
  essentialDocumentsData: initialEssentialDocumentsData,
  complianceVerificationData: initialComplianceVerificationData,
  investmentPreferencesData: initialInvestmentPreferencesData,
  businessListingData: initialBusinessListingData,
  currentStep: "form",
  isListingComplete: false,
  listingId: "",
  isAccountCreated: false,
};

const businessSlice = createSlice({
  name: "business",
  initialState,
  reducers: {
    setBusinessUserProfile(state, action) {
      state.businessUserProfile = action.payload;
    },
    clearBusinessUserProfile(state) {
      state.businessUserProfile = initialBusinessUserProfile;
    },
    setBusinessFormData(state, action) {
      state.businessFormData = action.payload;
    },
    updateBusinessFormData(state, action) {
      state.businessFormData = { ...state.businessFormData, ...action.payload };
    },
    setFundingStructureData(state, action) {
      state.fundingStructureData = action.payload;
    },
    updateFundingStructureData(state, action) {
      state.fundingStructureData = {
        ...state.fundingStructureData,
        ...action.payload,
      };
    },
    setCompanyMetricsData(state, action) {
      state.companyMetricsData = action.payload;
    },
    updateCompanyMetricsData(state, action) {
      state.companyMetricsData = {
        ...state.companyMetricsData,
        ...action.payload,
      };
    },
    setUseOfFundsData(state, action) {
      state.useOfFundsData = action.payload;
    },
    updateUseOfFundsData(state, action) {
      state.useOfFundsData = { ...state.useOfFundsData, ...action.payload };
    },
    setEssentialDocumentsData(state, action) {
      state.essentialDocumentsData = action.payload;
    },
    updateEssentialDocumentsData(state, action) {
      state.essentialDocumentsData = {
        ...state.essentialDocumentsData,
        ...action.payload,
      };
    },
    setComplianceVerificationData(state, action) {
      state.complianceVerificationData = action.payload;
    },
    updateComplianceVerificationData(state, action) {
      // Check if the current state has the old structure and clear it
      if (
        state.complianceVerificationData &&
        "documents" in state.complianceVerificationData
      ) {
        state.complianceVerificationData = initialComplianceVerificationData;
      }

      // Ensure we only store serializable data
      const payload = action.payload;
      const serializablePayload = {
        interest_structure:
          payload.interest_structure ||
          payload.regulatoryInfo?.interestStructure ||
          "",
        registration_number:
          payload.registration_number ||
          payload.regulatoryInfo?.registrationNumber ||
          "",
        tax_id_number:
          payload.tax_id_number || payload.regulatoryInfo?.taxIdNumber || "",
        registered_address:
          payload.registered_address ||
          payload.regulatoryInfo?.registeredAddress ||
          "",
        legally_incorporated:
          payload.legally_incorporated ||
          payload.complianceChecklist?.legallyIncorporated ||
          false,
        founders_equity_agreement:
          payload.founders_equity_agreement ||
          payload.complianceChecklist?.clearEquityAgreements ||
          false,
        pending_legal_disputes:
          payload.pending_legal_disputes !== undefined
            ? payload.pending_legal_disputes
            : payload.complianceChecklist?.noPendingDisputes !== undefined
            ? !payload.complianceChecklist.noPendingDisputes
            : false,
        authorized_to_raise_capital:
          payload.authorized_to_raise_capital ||
          payload.complianceChecklist?.authorizedToRaise ||
          false,
        local_securities_regulations:
          payload.local_securities_regulations ||
          payload.complianceChecklist?.securitiesCompliance ||
          false,
        certificate_of_incorporation:
          payload.certificate_of_incorporation || "",
        founder_agreements: payload.founder_agreements || "",
        legal_compliance_certificate:
          payload.legal_compliance_certificate || "",
        declaration: payload.declaration || false,
      };

      state.complianceVerificationData = {
        ...state.complianceVerificationData,
        ...serializablePayload,
      };
    },
    setInvestmentPreferencesData(state, action) {
      state.investmentPreferencesData = action.payload;
    },
    updateInvestmentPreferencesData(state, action) {
      state.investmentPreferencesData = {
        ...state.investmentPreferencesData,
        ...action.payload,
      };
    },
    setBusinessListingData(state, action) {
      state.businessListingData = action.payload;
    },
    updateBusinessListingData(state, action) {
      state.businessListingData = {
        ...state.businessListingData,
        ...action.payload,
      };
    },
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    setIsListingComplete(state, action) {
      state.isListingComplete = action.payload;
    },
    setListingId(state, action) {
      state.listingId = action.payload;
    },
    setIsAccountCreated(state, action) {
      state.isAccountCreated = action.payload;
    },
    clearComplianceVerificationData(state) {
      state.complianceVerificationData = initialComplianceVerificationData;
    },
    clearAllBusinessData(state) {
      state.businessUserProfile = initialBusinessUserProfile;
      state.businessFormData = initialBusinessFormData;
      state.fundingStructureData = initialFundingStructureData;
      state.companyMetricsData = initialCompanyMetricsData;
      state.useOfFundsData = initialUseOfFundsData;
      state.essentialDocumentsData = initialEssentialDocumentsData;
      state.complianceVerificationData = initialComplianceVerificationData;
      state.investmentPreferencesData = initialInvestmentPreferencesData;
      state.businessListingData = initialBusinessListingData;
      state.currentStep = "form";
      state.isListingComplete = false;
      state.listingId = "";
      state.isAccountCreated = false;
    },
  },
});

export const {
  setBusinessUserProfile,
  clearBusinessUserProfile,
  setBusinessFormData,
  updateBusinessFormData,
  setFundingStructureData,
  updateFundingStructureData,
  setCompanyMetricsData,
  updateCompanyMetricsData,
  setUseOfFundsData,
  updateUseOfFundsData,
  setEssentialDocumentsData,
  updateEssentialDocumentsData,
  setComplianceVerificationData,
  updateComplianceVerificationData,
  clearComplianceVerificationData,
  setInvestmentPreferencesData,
  updateInvestmentPreferencesData,
  setBusinessListingData,
  updateBusinessListingData,
  setCurrentStep,
  setIsListingComplete,
  setListingId,
  setIsAccountCreated,
  clearAllBusinessData,
} = businessSlice.actions;
export default businessSlice.reducer;
