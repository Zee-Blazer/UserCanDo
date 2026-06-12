import {
  BusinessStep,
  CompetitiveAdvantage,
  HowItWorksStep,
  Investment,
  KeyMetric,
  NavigationItem,
  SecurityFeature,
  SocialMediaLink,
  TabItem,
  Testimonial,
  TimelineEvent,
  WhyChooseFeature,
} from "@/types/landing-page";
import {
  Article as DocumentsIcon,
  Assessment as FinancialsIcon,
  Info as OverviewIcon,
  AccountCircle as TeamIcon,
} from "@mui/icons-material";
import { isProd } from "../utils/helpers";

export const NAVIGATION_ITEMS: NavigationItem[] = [
  { label: "Investments", href: "/investments" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "About", href: "/about-us" },
  { label: "Resources", href: "/african-investment-insights" },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: "1",
    title: "Browse Opportunities",
    description:
      "Explore vetted businesses across\nvarious sectors and filter by your\ninvestment preferences.",
    icon: "/search.png",
  },
  {
    id: "2",
    title: "Due Diligence",
    description:
      "Access comprehensive business\ninformation and conduct thorough\ndue diligence before investing.",
    icon: "/due-deligence.png",
  },
  {
    id: "3",
    title: "Invest",
    description:
      "Choose your investment amount and\ncomplete the transaction securely\nthrough our platform.",
    icon: "/invest.png",
  },
  {
    id: "4",
    title: "Track & Engage",
    description:
      "Monitor your investments and engage\ndirectly with business owners for\nupdates and insights.",
    icon: "/track-engage.png",
  },
];


export const BUSINESS_STEPS: BusinessStep[] = [
  {
    id: "1",
    title: "Apply",
    description: "Submit your business for review with key information about your company and growth plans.",
    icon: "/mark.png",
  },
  {
    id: "2",
    title: "Get Verified",
    description: "Our team reviews your application and conducts verification checks to ensure quality.",
    icon: "/get-verifed.png",
  },
  {
    id: "3",
    title: "Connect",
    description: "Get matched with interested investors and engage with them through our platform.",
    icon: "/track-engage.png",
  },
  {
    id: "4",
    title: "Close & Grow",
    description: "Secure funding and leverage our resources to grow your business successfully.",
    icon: "/lock.png",
  },
];

export const SECURITY_FEATURES: SecurityFeature[] = [
  {
    id: "1",
    title: "Rigorous Screening",
    description: "Every business undergoes thorough financial and legal verification\nbefore being listed.",
  },
  {
    id: "2",
    title: "Secure Transactions",
    description: "All financial transactions are processed through our secure\npayment infrastructure.",
  },
  {
    id: "3",
    title: "Ongoing Monitoring",
    description: "We continuously track business performance and ensure regular\nupdates to investors.",
  },
];

export const WHY_CHOOSE_FEATURES: WhyChooseFeature[] = [
  {
    id: "1",
    title: "Curated Opportunities",
    description: "Access to pre-screened, high-potential businesses\nacross various sectors.",
    icon: "/verify-blue.png",
  },
  {
    id: "2",
    title: "Expert Guidance",
    description: "Support from our team of investment professionals throughout\nthe process.",
    icon: "/people-blue.png",
  },
  {
    id: "3",
    title: "Transparent Documentation",
    description: "Access to comprehensive business information and legal\ndocumentation.",
    icon: "/document-blue.png",
  },
];

{/* NOT PROD READY */ }
export const INVESTMENTS: Investment[] = !isProd ? [
  {
    id: "1",
    category: "FINTECH",
    title: "TechPay Solutions",
    location: "Kenya",
    description:
      "A leading payment processing platform for small businesses across Africa.",
    fundingProgress: 75,
    targetAmount: 250000,
    expectedROI: "18-22%",
    founded: 2019,
    teamSize: 24,
    website: "techpaysolutions.com",
    email: "investors@techpaysolutions.com",
    phone: "+254 712 345 678",
    headquarters: "Nairobi, Kenya",
    investmentTerm: "5 - 7 years",
    minInvestment: 10000,
    investors: 14,
    closingDays: 21,
    businessOverview: `TechPay Solutions is revolutionizing how small businesses across Africa process payments. By integrating mobile money platforms, traditional banking, and innovative cross-border solutions, TechPay enables businesses to accept payments from customers regardless of their preferred payment method. With a focus on security, speed, and low transaction costs, TechPay has already onboarded over 5,000 merchants across Kenya, Uganda, and Tanzania. The company's proprietary technology reduces transaction costs by up to 70% compared to traditional payment processors, while increasing transaction success rates by 45%. Their mobile-first approach is particularly suited to the African market, where mobile money adoption far exceeds traditional banking penetration. TechPay is seeking investment to expand operations into Nigeria, Ghana, and Rwanda, as well as to enhance their product offering with advanced analytics and business management tools for merchants.`,
    businessOverviewTitle: "Detailed information about TechPay Solutions",
  },
  {
    id: "2",
    category: "AGRICULTURE",
    title: "GreenHarvest Farms",
    location: "Tanzania",
    description:
      "Sustainable farming operation specializing in high-value export crops.",
    fundingProgress: 60,
    targetAmount: 400000,
    expectedROI: "15-20%",
    founded: 2020,
    teamSize: 18,
    website: "greenharvestfarms.com",
    email: "investors@greenharvestfarms.com",
    phone: "+255 712 345 678",
    headquarters: "Dar es Salaam, Tanzania",
    investmentTerm: "4 - 6 years",
    minInvestment: 15000,
    investors: 8,
    closingDays: 35,
    businessOverview: `GreenHarvest Farms leverages sustainable agricultural practices and advanced irrigation technology to maximize crop yields and quality. The company partners with local farmers and export agencies to ensure a steady market for high-value crops. With a focus on environmental stewardship and community empowerment, GreenHarvest is expanding its operations to new regions and investing in value-added processing facilities.`,
    businessOverviewTitle: "Detailed information about GreenHarvest Farms",
  },
  {
    id: "3",
    category: "HEALTHCARE",
    title: "MediConnect Health",
    location: "Nigeria",
    description:
      "Telemedicine platform connecting patients with healthcare providers.",
    fundingProgress: 85,
    targetAmount: 350000,
    expectedROI: "20-25%",
    founded: 2021,
    teamSize: 32,
    website: "mediconnecthealth.com",
    email: "investors@mediconnecthealth.com",
    phone: "+234 712 345 678",
    headquarters: "Lagos, Nigeria",
    investmentTerm: "6 - 8 years",
    minInvestment: 12000,
    investors: 22,
    closingDays: 14,
    businessOverview: `MediConnect Health is transforming healthcare access in Nigeria by providing a robust telemedicine platform. Patients can consult with certified doctors remotely, access prescriptions, and receive follow-up care. The platform integrates with local pharmacies and diagnostic centers, ensuring a seamless healthcare experience. MediConnect is scaling rapidly, targeting underserved regions and expanding its network of healthcare professionals.`,
    businessOverviewTitle: "Detailed information about MediConnect Health",
  },
  {
    id: "4",
    category: "REAL ESTATE",
    title: "Urban Spaces",
    location: "Ghana",
    description:
      "Affordable housing development in rapidly growing urban centers.",
    fundingProgress: 40,
    targetAmount: 500000,
    expectedROI: "12-16%",
    isSharesCompliant: true,
    founded: 2018,
    teamSize: 45,
    website: "urbanspaces.com",
    email: "investors@urbanspaces.com",
    phone: "+233 712 345 678",
    headquarters: "Accra, Ghana",
    investmentTerm: "7 - 10 years",
    minInvestment: 20000,
    investors: 6,
    closingDays: 45,
    businessOverview: `Urban Spaces addresses the housing deficit in Ghana by developing affordable, high-quality residential units in urban centers. The company utilizes modern construction techniques and sustainable materials to reduce costs and environmental impact. Urban Spaces collaborates with local governments and financial institutions to provide accessible mortgage solutions for first-time homebuyers.`,
    businessOverviewTitle: "Detailed information about Urban Spaces",
  },
  {
    id: "5",
    category: "LOGISTICS",
    title: "LogiTech Delivery",
    location: "South Africa",
    description:
      "Last-mile delivery service using technology to optimize routes and reduce costs.",
    fundingProgress: 55,
    targetAmount: 300000,
    expectedROI: "16-20%",
    founded: 2020,
    teamSize: 28,
    website: "logitechdelivery.com",
    email: "investors@logitechdelivery.com",
    phone: "+27 712 345 678",
    headquarters: "Johannesburg, South Africa",
    investmentTerm: "5 - 7 years",
    minInvestment: 10000,
    investors: 12,
    closingDays: 28,
    businessOverview: `LogiTech Delivery is a technology-driven logistics company focused on optimizing last-mile delivery in South Africa. By leveraging real-time data and AI-powered route planning, LogiTech reduces delivery times and operational costs. The company partners with e-commerce platforms and retailers to provide reliable, scalable delivery solutions across major cities.`,
    businessOverviewTitle: "Detailed information about LogiTech Delivery",
  },
  {
    id: "6",
    category: "ENERGY",
    title: "EcoEnergy Solutions",
    location: "Rwanda",
    description:
      "Renewable energy provider focusing on solar installations for businesses.",
    fundingProgress: 30,
    targetAmount: 450000,
    expectedROI: "14-18%",
    isSharesCompliant: true,
    founded: 2019,
    teamSize: 36,
    website: "ecoenergysolutions.com",
    email: "investors@ecoenergysolutions.com",
    phone: "+250 712 345 678",
    headquarters: "Kigali, Rwanda",
    investmentTerm: "6 - 8 years",
    minInvestment: 18000,
    investors: 4,
    closingDays: 60,
    businessOverview: `EcoEnergy Solutions is committed to accelerating the adoption of renewable energy in Rwanda. The company designs and installs solar power systems for businesses, reducing reliance on the national grid and lowering energy costs. EcoEnergy also offers maintenance and financing options, making clean energy accessible to a wider range of clients.`,
    businessOverviewTitle: "Detailed information about EcoEnergy Solutions",
  },
] : [];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Angel Investor",
    avatar: "/sarah.png",
    content:
      "Nexfund has transformed how I approach investing in emerging markets. The due diligence process is thorough, and the platform makes it easy to track my investments.",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Investment Manager",
    avatar: "/michael.png",
    content:
      "The quality of businesses on Nexfund is exceptional. I've found several high-potential investments that align perfectly with my portfolio strategy.",
  },
  {
    id: "3",
    name: "Amina Hassan",
    role: "Private Investor",
    avatar: "/amina.png",
    content:
      "What sets Nexfund apart is the transparency and direct access to business owners. It feels like being part of the growth journey.",
  },
];

export const SOCIAL_MEDIA_LINKS: SocialMediaLink[] = [
  {
    icon: "/x.png",
    href: "https://twitter.com/nexfund",
    label: "Twitter",
    ariaLabel: "Follow us on Twitter",
  },
  {
    icon: "/facebook.png",
    href: "https://facebook.com/nexfund",
    label: "Facebook",
    ariaLabel: "Follow us on Facebook",
  },
  {
    icon: "/instagram.png",
    href: "https://instagram.com/nexfund",
    label: "Instagram",
    ariaLabel: "Follow us on Instagram",
  },
  {
    icon: "/linkedin.png",
    href: "https://linkedin.com/company/nexfund",
    label: "LinkedIn",
    ariaLabel: "Follow us on LinkedIn",
  },
];

export const FOOTER_LINKS = {
  platform: [
    { label: "Browse Investments", href: "/investments" },
    { label: "How It Works", href: "/how-it-works" },
    // { label: "For Businesses", href: "/businesses" },
    // { label: "For Investors", href: "/investors" },
    { label: "Syndicates", href: "/investment-guide" },
  ],
  resources: [
    { label: "Investment Guides", href: "/investment-guide" },
    { label: "FAQ", href: "/faq" },
    { label: "Blog", href: "/african-investment-insights" },
    { label: "Webinars", href: "/investment-webinars" },
    { label: "Contact Us", href: "/contacts" },
  ],
  legal: [
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "GDPR Disclaimer", href: "/gdpr-disclaimer" },
  ],
};

{/* NOT PROD READY */ }
export const KEY_METRICS: KeyMetric[] = !isProd ? [
  { label: "Monthly Revenue", value: "$45,000" },
  { label: "Monthly Growth", value: "8.5%" },
  { label: "Active Merchants", value: "5,200+" },
  { label: "Transaction Volume", value: "$1.2M/month" },
  { label: "Customer Retention", value: "92%" },
  { label: "Market Share", value: "15%" },
] : [];

{/* NOT PROD READY */ }
export const TIMELINE_EVENTS: TimelineEvent[] = !isProd ? [
  {
    date: "May 2026",
    title: "Funding round opens",
    description: "",
    completed: true,
  },
  {
    date: "July 2026",
    title: "Due diligence period",
    description: "",
    completed: true,
  },
  {
    date: "August 2026",
    title: "Investment closing",
    description: "",
    completed: false,
  },
  {
    date: "September 2026",
    title: "Funds disbursement",
    description: "",
    completed: false,
  },
  {
    date: "Q4 2026",
    title: "Expansion to Nigeria",
    description: "",
    completed: false,
  },
  {
    date: "Q1 2027",
    title: "Production enhancement",
    description: "",
    completed: false,
  },
] : [];

export const COMPETITIVE_ADVANTAGES: CompetitiveAdvantage[] = [
  {
    title: "Proprietary technology that reduces transaction costs by up to 70%",
    description: "",
  },
  {
    title:
      "Deep integration with all major mobile money platforms across East Africa",
    description: "",
  },
  {
    title: "Strong relationships with local banks and financial institutions",
    description: "",
  },
  {
    title: "Experienced team with extensive fintech and payments background",
    description: "",
  },
  {
    title: "First-mover advantage in several key markets",
    description: "",
  },
];

export const FAQ_GROUPS = [
  {
    id: "general",
    title: "General Questions",
    faqs: [
      {
        question: "What is Nexfund?",
        answer:
          "Nexfund is a digital investment platform connecting investors with vetted African businesses seeking capital. We provide transparent due diligence, secure transactions, and ongoing investment tracking. Our platform serves both equity and debt investors, with specialized products like asset-backed loans for African SMEs.",
      },
      {
        question: "How does Nexfund work?",
        answer:
          "Nexfund connects investors with pre-vetted businesses seeking capital. Investors can browse opportunities, conduct due diligence, invest securely, and track their portfolio through the platform.",
      },
      {
        question: "Who can invest on Nexfund?",
        answer:
          "Both individual and institutional investors who meet our eligibility criteria can invest on Nexfund.",
      },
      {
        question: "Is my investment secure?",
        answer:
          "We conduct thorough due diligence and use secure payment infrastructure, but all investments carry some risk. Please review each opportunity carefully.",
      },
    ],
  },
  {
    id: "investment-process",
    title: "Investment Process",
    faqs: [
      {
        question: "What is the minimum investment amount?",
        answer:
          "Minimum investments vary by opportunity, typically ranging from $10,000 to $50,000. Some syndicated deals may have lower minimums. Revenue-based financing and asset-backed loans often start at $25,000.",
      },
      {
        question: "How long does the investment process take?",
        answer:
          "The process duration depends on the opportunity and due diligence requirements, but most investments close within a few weeks to a couple of months.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept bank transfers, wire payments, and other secure payment methods as specified for each opportunity.",
      },
      {
        question: "Can I cancel my investment?",
        answer:
          "Investments can only be cancelled before the closing date. Please review the terms of each opportunity for details.",
      },
    ],
  },
  {
    id: "due-diligence-risk",
    title: "Due Diligence & Risk",
    faqs: [
      {
        question: "How do you vet businesses?",
        answer:
          `Our comprehensive screening includes:\n• Financial health assessment (3+ years of financials)\n• Legal compliance verification\n• Management team background checks\n• Market opportunity analysis\n• Reference checks with customers/partners`,
      },
      {
        question: "What risks should I be aware of?",
        answer:
          "All investments carry risk, including business failure, market changes, and economic factors. Please review each opportunity's risk disclosures.",
      },
      {
        question: "Do you guarantee returns?",
        answer:
          "No, returns are not guaranteed. We strive to present high-quality opportunities, but all investments involve risk.",
      },
    ],
  },
  {
    id: "african-markets",
    title: "African Markets",
    faqs: [
      {
        question: "Which African countries do you cover?",
        answer:
          "We currently operate in Kenya, Nigeria, Ghana, Tanzania, Rwanda, and Uganda, with expansion planned for Senegal, Côte d'Ivoire, and Morocco. Coverage varies by investment type.",
      },
      {
        question: "How do you handle currency risk?",
        answer:
          "We work with partners to manage currency risk, but investors should be aware of potential fluctuations in exchange rates.",
      },
      {
        question: "What about political risk?",
        answer:
          "We assess political risk as part of our due diligence, but investors should consider the broader environment in each country.",
      },
    ],
  },
  {
    id: "asset-backed-loans",
    title: "Asset-Backed Loans",
    faqs: [
      {
        question: "What is asset-backed debt financing?",
        answer:
          "This is secured lending where businesses use real estate or equipment as collateral. Interest rates are typically 8-15% annually, with terms of 1-5 years. It's less risky than equity investment with more predictable returns.",
      },
      {
        question: "How is collateral verified?",
        answer:
          "We conduct thorough due diligence and work with local partners to verify collateral before approving loans.",
      },
      {
        question: "What happens if a borrower defaults?",
        answer:
          "In the event of default, we work to recover the collateral and return proceeds to investors, subject to local laws and processes.",
      },
    ],
  },
  {
    id: "platform-technology",
    title: "Platform & Technology",
    faqs: [
      {
        question: "How do I track my investments?",
        answer:
          `Your dashboard provides:\n• Real-time portfolio performance\n• Business update notifications\n• Financial statement access\n• Exit event tracking\n• Tax document downloads`,
      },
      {
        question: "Do you provide tax documents?",
        answer:
          "Yes, we provide downloadable tax documents for your investments at the end of each tax year.",
      },
    ],
  },
];

export const getTabs = (): TabItem[] => [
  {
    id: "overview",
    label: "Overview",
    icon: <OverviewIcon sx={{ fontSize: { xs: 16, md: 18 }, mr: 1 }} />,
  },
  {
    id: "team",
    label: "Team",
    icon: <TeamIcon sx={{ fontSize: { xs: 16, md: 18 }, mr: 1 }} />,
  },
  {
    id: "financials",
    label: "Financials",
    icon: <FinancialsIcon sx={{ fontSize: { xs: 16, md: 18 }, mr: 1 }} />,
  },
  {
    id: "documents",
    label: "Documents",
    icon: <DocumentsIcon sx={{ fontSize: { xs: 16, md: 18 }, mr: 1 }} />,
  },
];
