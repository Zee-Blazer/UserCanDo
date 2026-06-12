import { ROUTES } from "@/constants/routes";
import { IdCard, ListChecks, Users } from "lucide-react";
import Image from "next/image";
import { isProd } from "../../../utils/helpers";

export type DashboardType = 'investor' | 'business' | 'admin';

export const getNavItems = (dashboardType: DashboardType = 'investor') => {
    const baseItems = [
        {
            title: "Dashboard",
            icon: (
                <Image
                    src="/dashboard-home.png"
                    alt="Dashboard"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: dashboardType === 'business' ? ROUTES.businessDashboard :
                dashboardType === 'admin' ? ROUTES.adminDashboard : ROUTES.dashboard,
            sub: [],
        },
        {
            title: "Investments",
            icon: (
                <Image
                    src="/system-coins.png"
                    alt="investments"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: dashboardType === 'business' ? ROUTES.businessInvestments :
                dashboardType === 'admin' ? ROUTES.adminInvestments : ROUTES.investments,
            sub: [],
        },
        {
            title: "Opportunities",
            icon: (
                <Image
                    src="/job-search.png"
                    alt="Opportunities"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: dashboardType === 'business' ? ROUTES.businessOpportunities :
                dashboardType === 'admin' ? ROUTES.adminDueDiligence : ROUTES.opportunities,
            sub: [],
        },
        ...(
            !isProd ? [{
                title: "Analytics",
                icon: (
                    <Image
                        src="/analytics.png"
                        alt="Analytics"
                        width={24}
                        height={24}
                        style={{ objectFit: 'contain' }}
                    />
                ),
                path: dashboardType === 'business' ? ROUTES.businessAnalytics :
                    dashboardType === 'admin' ? ROUTES.adminFundManagement : ROUTES.analytics,
                sub: [],
            },
                // {
                //     title: "Documents",
                //     icon: (
                //         <Image
                //             src="/fluent-document.png"
                //             alt="Payslips"
                //             width={24}
                //             height={24}
                //             style={{ objectFit: 'contain' }}
                //         />
                //     ),
                //     path: dashboardType === 'business' ? ROUTES.businessDocuments :
                //         dashboardType === 'admin' ? ROUTES.adminDocuments : ROUTES.documents,
                //     sub: [],
                // },
            ] : []
        ),
        {
            title: "Settings",
            icon: (
                <Image
                    src="/settings.png"
                    alt="Settings"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: dashboardType === 'business' ? ROUTES.businessSettings :
                dashboardType === 'admin' ? ROUTES.adminSettings : ROUTES.settings,
            sub: [],
        },
    ];


    if (dashboardType === 'business') {

        return baseItems;
    }

    return baseItems;
};


export const getBusinessNavItems = () => {
    return [
        {
            title: "Dashboard",
            icon: (
                <Image
                    src="/dashboard-home.png"
                    alt="Business Dashboard"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: ROUTES.businessDashboard,
            sub: [],
        },
        ...(
            !isProd ? [{
                title: "Investors",
                // icon now a function to allow passing color
                icon: (isActive?: boolean) => <Users size={20} color={isActive ? "#22c55e" : undefined} />,
                path: ROUTES.businessInvestments,
                sub: [],
            },] : []
        ),
        {
            title: "Documents",
            icon: (
                <Image
                    src="/job-search.png"
                    alt="Deal Flow"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: ROUTES.businessOpportunities,
            sub: [],
        },
        ...(
            !isProd ? [
                {
                    title: "Funding",
                    icon: (
                        <Image
                            src="/analytics.png"
                            alt="Business Analytics"
                            width={24}
                            height={24}
                            style={{ objectFit: 'contain' }}
                        />
                    ),
                    path: ROUTES.businessAnalytics,
                    sub: [],
                },
            ] : []
        ),
        ...(
            !isProd ? [
                // {
                //     title: "Analytics",
                //     icon: (
                //         <Image
                //             src="/fluent-document.png"
                //             alt="Compliance"
                //             width={24}
                //             height={24}
                //             style={{ objectFit: 'contain' }}
                //         />
                //     ),
                //     path: ROUTES.businessDocuments,
                //     sub: [],
                // },
            ] : []
        ),
        {
            title: "Settings",
            icon: (
                <Image
                    src="/settings.png"
                    alt="Business Settings"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: ROUTES.businessSettings,
            sub: [],
        },
    ];
};

// Admin-specific navigation items
export const getAdminNavItems = () => {
    return [
        {
            title: "Dashboard",
            icon: (
                <Image
                    src="/dashboard-home.png"
                    alt="Admin Dashboard"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: ROUTES.adminDashboard,
            sub: [],
        },
        {
            title: "User Management",
            icon: (
                <Image
                    src="/people-blue.png"
                    alt="User Management"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: ROUTES.adminUsers,
            sub: [],
        },
        {
            title: "Investments",
            icon: (
                <Image
                    src="/job-search.png"
                    alt="Investment Oversight"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: ROUTES.adminInvestments,
            sub: [],
        },
        {
            title: "Due Diligence",
            icon: (isActive?: boolean) => (
                <ListChecks size={18} color={isActive ? "#22c55e" : "#6B7280"} />
            ),
            path: ROUTES.adminDueDiligence,
            sub: [],
        },
        {
            title: "Fund Management",
            icon: (
                <Image
                    src="/system-coins.png"
                    alt="System Analytics"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: ROUTES.adminFundManagement,
            sub: [],
        },
        // {
        //     title: "Document Management",
        //     icon: (
        //         <Image
        //             src="/fluent-document.png"
        //             alt="Document Management"
        //             width={24}
        //             height={24}
        //             style={{ objectFit: 'contain' }}
        //         />
        //     ),
        //     path: ROUTES.adminDocuments,
        //     sub: [],
        // },
        // {
        //     title: "Content Management",
        //     icon: (isActive?: boolean) => (
        //         <Newspaper size={18} color={isActive ? "#22c55e" : "#6B7280"} />
        //     ),
        //     path: ROUTES.adminContent,
        //     sub: [],
        // },
        {
            title: "Teams",
            icon: (isActive?: boolean) => (
                <IdCard size={18} color={isActive ? "#22c55e" : "#6B7280"} />
            ),
            path: ROUTES.adminTeams,
            sub: [],
        },
        {
            title: "Settings",
            icon: (
                <Image
                    src="/settings.png"
                    alt="Admin Settings"
                    width={24}
                    height={24}
                    style={{ objectFit: 'contain' }}
                />
            ),
            path: ROUTES.adminSettings,
            sub: [],
        },
    ];
};