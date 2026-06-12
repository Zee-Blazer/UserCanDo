import { clearAdminUserProfile } from "@/Redux/features/adminSlice";
import { logUserOut } from "@/Redux/features/authSlice";
import { clearBusinessUserProfile } from "@/Redux/features/businessSlice";
import { clearInvestorUserProfile } from "@/Redux/features/investorSlice";
import { apiSlice } from "@/queries";
import { clearAuthToken } from "@/utils/auth";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const useLogout = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const logout = () => {
        clearAuthToken();

        dispatch(logUserOut());

        dispatch(clearAdminUserProfile());
        dispatch(clearBusinessUserProfile());
        dispatch(clearInvestorUserProfile());

        // Clear all RTK Query cache to prevent data from previous account persisting
        dispatch(apiSlice.util.resetApiState());

        router.push("/sign-in");
    };

    return logout;
};
