"use client";
import {
    navigateToNextDueDiligence,
    navigateToNextInvestment,
    navigateToNextUser,
    navigateToPreviousDueDiligence,
    navigateToPreviousInvestment,
    navigateToPreviousUser
} from "@/Redux/features/adminSlice";
import { RootState } from "@/Redux/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

type NavigationType = 'users' | 'dueDiligence' | 'investments';

interface Props {
    sidenav?: boolean;
    text?: string;
    enableNavigation?: boolean;
    navigationType?: NavigationType; // Type of navigation
}

const BgCover = ({ sidenav = true, text, enableNavigation = false, navigationType = 'users' }: Props) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const {
        allUsersData,
        currentUserIndex,
        allDueDiligenceData,
        currentDueDiligenceIndex,
        allInvestmentsData,
        currentInvestmentIndex
    } = useSelector((state: RootState) => state.admin);

    const getNavigationState = () => {
        switch (navigationType) {
            case 'users':
                return {
                    canPrevious: enableNavigation && allUsersData && currentUserIndex > 0,
                    canNext: enableNavigation && allUsersData && currentUserIndex < allUsersData.length - 1,
                    handlePrevious: () => dispatch(navigateToPreviousUser()),
                    handleNext: () => dispatch(navigateToNextUser())
                };
            case 'dueDiligence':
                return {
                    canPrevious: enableNavigation && allDueDiligenceData && currentDueDiligenceIndex > 0,
                    canNext: enableNavigation && allDueDiligenceData && currentDueDiligenceIndex < allDueDiligenceData.length - 1,
                    handlePrevious: () => dispatch(navigateToPreviousDueDiligence()),
                    handleNext: () => dispatch(navigateToNextDueDiligence())
                };
            case 'investments':
                return {
                    canPrevious: enableNavigation && allInvestmentsData && currentInvestmentIndex > 0,
                    canNext: enableNavigation && allInvestmentsData && currentInvestmentIndex < allInvestmentsData.length - 1,
                    handlePrevious: () => dispatch(navigateToPreviousInvestment()),
                    handleNext: () => dispatch(navigateToNextInvestment())
                };
            default:
                return {
                    canPrevious: false,
                    canNext: false,
                    handlePrevious: () => { },
                    handleNext: () => { }
                };
        }
    };

    const { canPrevious, canNext, handlePrevious, handleNext } = getNavigationState();

    return (
        <div className="bg-[#043A66] w-full h-52 md:px-4">
            <div className="flex justify-between items-center p-5 text-white">
                <button
                    className="flex items-center md:gap-2 cursor-pointer text-sm md:text-base font-normal hover:no-underline underline transition"
                    onClick={() => router.back()}
                >
                    <ChevronLeft />
                    Back to {text || "Investors"}
                </button>

                {
                    sidenav && (
                        <div>
                            <button
                                className={`cursor-pointer rounded border border-white px-0.5 md:px-2 mx-1 ${canPrevious ? 'hover:bg-white hover:text-[#043A66] transition' : 'opacity-50 cursor-not-allowed'
                                    }`}
                                onClick={handlePrevious}
                                disabled={!canPrevious}
                            >
                                <ChevronLeft />
                            </button>
                            <button
                                className={`cursor-pointer rounded border border-white px-0.5 md:px-2 mx-1 ${canNext ? 'hover:bg-white hover:text-[#043A66] transition' : 'opacity-50 cursor-not-allowed'
                                    }`}
                                onClick={handleNext}
                                disabled={!canNext}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default BgCover;
