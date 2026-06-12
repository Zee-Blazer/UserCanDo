import {
    AboutHero,
    Mission,
    WhatWeDo,
    ApproachItem,
    MarketFocus,
    Value,
    Leadership,
    Compliance,
    Contact
} from "@/types/about-us";

export const ABOUT_HERO: AboutHero = {
    title: "Empowering African Innovation Through Strategic Investment",
    description: "Nexfund is a pioneering investment platform dedicated to unlocking Africa's vast potential by connecting visionary entrepreneurs with strategic capital and investors. Founded on the belief that exceptional innovation transcends borders, we specialize in identifying and supporting high-growth companies across the African continent while providing global investors with access to one of the world's most dynamic emerging markets."
};

export const MISSION: Mission = {
    title: "Our Mission",
    description: "To democratize access to African investment opportunities by creating a transparent, efficient, and secure platform that bridges the gap between exceptional African entrepreneurs and global capital. We are committed to fostering sustainable economic growth, supporting local innovation, and delivering superior returns to our investor community."
};

export const WHAT_WE_DO: WhatWeDo = {
    title: "What We Do",
    forInvestors: {
        title: "For Investors",
        items: [
            "Curated access to vetted investment opportunities across Africa",
            "Comprehensive due diligence and risk assessment services",
            "Portfolio management and performance tracking tools",
            "Market insights and intelligence on African business landscapes",
            "Streamlined KYC and compliance processes"
        ]
    },
    forInvestees: {
        title: "For Investees",
        items: [
            "Capital access from a global network of qualified investors",
            "Strategic advisory services and mentorship programs",
            "Business development support and market expansion guidance",
            "Corporate governance and compliance assistance",
            "Post-investment monitoring and value-add services"
        ]
    },
    image: "/what-we-do.png"
};

export const APPROACH_ITEMS: ApproachItem[] = [
    {
        id: "1",
        title: "Rigorous Due Diligence",
        description: "Every investment opportunity undergoes comprehensive evaluation including financial analysis, market assessment, management evaluation, and risk profiling to ensure only the highest quality opportunities reach our platform."
    },
    {
        id: "2",
        title: "Local Expertise, Global Reach",
        description: "With deep local market knowledge and extensive global networks, we provide unique insights and connections that drive successful outcomes across diverse African markets."
    },
    {
        id: "3",
        title: "Technology-Driven Platform",
        description: "Our proprietary platform leverages cutting-edge technology to provide seamless user experiences, robust security, and comprehensive analytics for both investors and investees."
    },
    {
        id: "4",
        title: "Compliance First",
        description: "We maintain the highest standards of regulatory compliance and corporate governance, ensuring all operations meet international best practices and local regulatory requirements."
    }
];

export const MARKET_FOCUS: MarketFocus[] = [
    { id: "1", sector: "Fintech and Digital Financial Services" },
    { id: "2", sector: "Agriculture and Food Security" },
    { id: "3", sector: "Healthcare and Biotechnology" },
    { id: "4", sector: "Education Technology" },
    { id: "5", sector: "Renewable Energy and Infrastructure" },
    { id: "6", sector: "Logistics and Supply Chain" }
];

export const VALUES: Value[] = [
    {
        id: "1",
        title: "Transparency",
        description: "We believe in clear, honest communication and full disclosure in all our dealings with investors and investees."
    },
    {
        id: "2",
        title: "Innovation",
        description: "We embrace new technologies and methodologies to continuously improve our platform and services."
    },
    {
        id: "3",
        title: "Excellence",
        description: "We maintain the highest standards in everything we do, from due diligence to customer service."
    },
    {
        id: "4",
        title: "Impact",
        description: "We are committed to investments that generate both financial returns and positive social and economic impact."
    },
    {
        id: "5",
        title: "Integrity",
        description: "We operate with the highest ethical standards and maintain strict confidentiality and data protection practices."
    }
];

export const LEADERSHIP: Leadership = {
    title: "Leadership Team",
    description: "Our experienced leadership team combines deep investment expertise with extensive knowledge of African markets, regulatory environments, and business practices. Together, we bring decades of combined experience in private equity, venture capital, corporate finance, and emerging market development."
};

export const COMPLIANCE: Compliance = {
    title: "Regulatory Compliance",
    description: "Nexfund operates under strict regulatory oversight and maintains all necessary licenses and registrations to provide investment services. We adhere to international standards for anti-money laundering (AML), know-your-customer (KYC), and data protection regulations."
};

export const CONTACT: Contact = {
    title: "Contact Us",
    description: "Nexfund operates under strict regulatory oversight and maintains all necessary licenses and registrations to provide investment services. We adhere to international standards for anti-money laundering (AML), know-your-customer (KYC), and data protection regulations.",
    image: "/contact-us.png"
};