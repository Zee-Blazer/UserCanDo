"use client";
import { clearAdminUserProfile } from "@/Redux/features/adminSlice";
import { logUserOut } from "@/Redux/features/authSlice";
import { clearBusinessUserProfile } from "@/Redux/features/businessSlice";
import { clearInvestorUserProfile } from "@/Redux/features/investorSlice";
import { useAuthSelector } from "@/Redux/selectors/index";
import { store } from "@/Redux/store";
import { clearAuthToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useContext } from "react";
import { Provider as ReduxProvider, useDispatch } from "react-redux";
import {
    useLoginMutation,
    useRegisterBusinessMutation,
    useRegisterInvestorMutation,
} from "../queries/authApi";
import {
    businessRegistrationCallback,
    businessRegistrationErrorCallback,
    loginCallback
} from "../queries/callbacks/authCallback";

interface AuthContextType {
    isLoggedIn: boolean;
    // loginData: LoginApiData;
    // login: (data: LoginApiData) => void;
    logout: () => void;
    isCreatingBusinessAccount: boolean;
    handleCreateBusinessAccount: (formData: any, callback?: (result: any) => void) => void;
    isCreatingInvestorAccount: boolean;
    handleCreateInvestorAccount: (formData: any, callback?: (result: any) => void) => void;
    isLoggingIn: boolean;
    handleLogin: (formData: any, callback?: (result: any) => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ReduxProvider store={store}>
            <AuthProviderInner>{children}</AuthProviderInner>
        </ReduxProvider>
    );
};

const AuthProviderInner = ({ children }: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { isLoggedIn, loginData } = useAuthSelector();

    // RTK Query Mutations
    const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
    const [registerBusinessMutation, { isLoading: isCreatingBusinessAccount }] = useRegisterBusinessMutation();
    const [registerInvestorMutation, { isLoading: isCreatingInvestorAccount }] = useRegisterInvestorMutation();

    // const login = (data: LoginApiData) => {
    //     setAuthToken(data.access_token);
    //     dispatch(logUserIn(data));
    // };

    const logout = () => {
        clearAuthToken();

        // Clear user-specific localStorage items
        if (typeof window !== 'undefined') {
            localStorage.removeItem('current_user_id');
            localStorage.removeItem('current_avatar');
        }

        dispatch(logUserOut());

        dispatch(clearAdminUserProfile());
        dispatch(clearBusinessUserProfile());
        dispatch(clearInvestorUserProfile());

        router.push("/sign-in");
    };

    const handleCreateBusinessAccount = async (formData: any, callback?: (result: any) => void) => {
        try {
            const data = {
                company_name: formData.companyName,
                industry_sector: formData.industry,
                year_founded: formData.yearFounded,
                country_location: formData.country,
                headquarters: formData.headquarters,
                company_size: formData.companySize,
                current_stage: formData.currentStage,
                description: formData.briefDescription,
                market_opportunity_description: formData.marketOpportunityDescription || formData.market_opportunity_description || '',
                competitive_advantage_description: formData.competitive_advantage_description || formData.competitiveAdvantageDescription || '',
                website_url: formData.websiteUrl,
                first_name: formData.firstName,
                last_name: formData.lastName,
                linked_in_profile: formData.linkedinProfile,
                email: formData.emailAddress,
                phone_number: formData.phoneNumber,
                password: formData.password,
            };

            const result = await registerBusinessMutation(data).unwrap();
            businessRegistrationCallback(result, formData, dispatch, callback);
        } catch (error: any) {
            businessRegistrationErrorCallback(error, callback);
        }
    };

    const handleLogin = async (formData: any, callback?: (result: any) => void) => {
        try {
            const data = {
                email: formData.email,
                password: formData.password,
            };

            const result = await loginMutation(data).unwrap();
            loginCallback(result, dispatch, router);

            if (callback) callback(result);
        } catch (error: any) {
            if (callback) callback(error);
        }
    };

    const handleCreateInvestorAccount = async (formData: any, callback?: (result: any) => void) => {
        // Investor registration now handled directly in components using RTK Query
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                // loginData,
                // login,
                logout,
                isCreatingBusinessAccount,
                handleCreateBusinessAccount,
                isCreatingInvestorAccount,
                handleCreateInvestorAccount,
                isLoggingIn,
                handleLogin,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
};

export { AuthProvider };
export default AuthProvider;
