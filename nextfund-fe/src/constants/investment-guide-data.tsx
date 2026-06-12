export interface InvestmentGuideCard {
    title: string;
    description: string;
    button: string;
    href: string;
}

export const INVESTMENT_GUIDE_CARDS: InvestmentGuideCard[] = [
    {
        title: "Blog & Insights",
        description: "Latest market analysis and investment insights from our experts.",
        button: "Read Blog",
        href: "/african-investment-insights",
    },
    {
        title: "Join Syndicates",
        description: "Co-invest with experienced investors and share knowledge.",
        button: "Explore Syndicates",
        href: "/join-investment-syndicates",
    },
    {
        title: "Webinars",
        description: "Learn from experts in live sessions and Q&A.",
        button: "View Schedule",
        href: "/investment-webinars",
    },
];
