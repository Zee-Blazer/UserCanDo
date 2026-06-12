import { TermsSection } from "../types/terms-data";

export const PRIVACY_POLICY_DATA: TermsSection[] = [
    {
        id: "1",
        title: "INTRODUCTION",
        content: `Nexfund Limited ("Nexfund", "we", "us", or "our") is committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our investment platform, website, mobile applications, and related services (collectively, the "Platform" or "Services").

By using our Services, you consent to the collection, use, and disclosure of your personal information as described in this Privacy Policy.`
    },
    {
        id: "2",
        title: "INFORMATION WE COLLECT",
        subsections: [
            {
                id: "2.1",
                title: "Personal Information You Provide",
                content: `We collect information you voluntarily provide to us, including:

Identity and Contact Information:`,
                items: [
                    "Full name, date of birth, nationality",
                    "Email address, phone number, mailing address",
                    "Government-issued identification documents",
                    "Professional and employment information"
                ],
                additionalSections: [
                    {
                        header: "Financial Information:",
                        items: [
                            "Bank account details and payment information",
                            "Investment experience and qualifications",
                            "Income, net worth, and financial statements",
                            "Investment objectives and risk tolerance",
                            "Tax identification numbers"
                        ]
                    },
                    {
                        header: "Account and Profile Information:",
                        items: [
                            "Username, password, and security questions",
                            "Profile preferences and settings",
                            "Investment history and portfolio information",
                            "Communications and correspondence with us"
                        ]
                    }
                ]
            },
            {
                id: "2.2",
                title: "Information We Collect Automatically",
                content: `When you use our Platform, we automatically collect:

Technical Information:`,
                items: [
                    "IP address, browser type and version",
                    "Device information and operating system",
                    "Usage patterns and navigation data",
                    "Cookies and similar tracking technologies",
                    "Log files and error reports"
                ],
                additionalSections: [
                    {
                        header: "Platform Usage Data:",
                        items: [
                            "Pages visited and features used",
                            "Time spent on different sections",
                            "Investment research and due diligence activities",
                            "Transaction history and patterns"
                        ]
                    }
                ]
            },
            {
                id: "2.3",
                title: "Information from Third Parties",
                content: "We may obtain information about you from:",
                items: [
                    "Identity verification services",
                    "Credit reporting agencies",
                    "Anti-money laundering (AML) databases",
                    "Public records and regulatory filings",
                    "Professional references and business partners",
                    "Social media platforms (if you connect them)"
                ]
            }
        ]
    },
    {
        id: "3",
        title: "HOW WE USE YOUR INFORMATION",
        subsections: [
            {
                id: "3.1",
                title: "Primary Purposes",
                content: `We use your personal information to:

Provide Our Services:`,
                items: [
                    "Create and manage your account",
                    "Process investment transactions",
                    "Provide access to investment opportunities",
                    "Deliver customer support and communications",
                    "Generate reports and statements"
                ],
                additionalSections: [
                    {
                        header: "Regulatory Compliance:",
                        items: [
                            "Verify your identity (KYC requirements)",
                            "Conduct anti-money laundering (AML) checks",
                            "Meet investor accreditation requirements",
                            "Comply with tax reporting obligations",
                            "Satisfy regulatory audit and examination requirements"
                        ]
                    },
                    {
                        header: "Risk Management and Security:",
                        items: [
                            "Assess investment suitability",
                            "Detect and prevent fraud",
                            "Monitor for suspicious activities",
                            "Protect against security threats",
                            "Maintain platform integrity"
                        ]
                    }
                ]
            },
            {
                id: "3.2",
                title: "Secondary Purposes",
                content: "With your consent or as permitted by law, we may use your information to:",
                items: [
                    "Send marketing communications and updates",
                    "Conduct market research and analysis",
                    "Improve our Platform and services",
                    "Develop new products and features",
                    "Provide personalized content and recommendations"
                ]
            }
        ]
    },
    {
        id: "4",
        title: "HOW WE SHARE YOUR INFORMATION",
        subsections: [
            {
                id: "4.1",
                title: "Sharing with Your Consent",
                content: "We may share your information with third parties when you explicitly consent to such sharing."
            },
            {
                id: "4.2",
                title: "Service Providers and Business Partners",
                content: "We share information with trusted partners who assist us in operating our Platform:",
                items: [
                    "Technology service providers",
                    "Payment processors and banks",
                    "Identity verification services",
                    "Legal, accounting, and audit firms",
                    "Customer support providers",
                    "Marketing and analytics services"
                ]
            },
            {
                id: "4.3",
                title: "Investment-Related Sharing",
                content: "To facilitate investments, we may share your information with:",
                items: [
                    "Investment opportunities and their managers",
                    "Co-investors in specific deals",
                    "Fund administrators and trustees",
                    "Legal counsel and transaction advisors",
                    "Due diligence service providers"
                ]
            },
            {
                id: "4.4",
                title: "Legal and Regulatory Requirements",
                content: "We may disclose your information when required by law or to:",
                items: [
                    "Comply with legal process and court orders",
                    "Respond to government and regulatory requests",
                    "Protect our rights and property",
                    "Prevent fraud and illegal activities",
                    "Ensure user and public safety"
                ]
            },
            {
                id: "4.5",
                title: "Business Transfers",
                content: "In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction."
            }
        ]
    },
    {
        id: "5",
        title: "DATA SECURITY AND PROTECTION",
        subsections: [
            {
                id: "5.1",
                title: "Security Measures",
                content: "We implement comprehensive security measures to protect your information:",
                items: [
                    "Industry-standard encryption for data transmission and storage",
                    "Multi-factor authentication and access controls",
                    "Regular security audits and penetration testing",
                    "Employee training on data protection",
                    "Secure data centers and infrastructure",
                    "Incident response and breach notification procedures"
                ]
            },
            {
                id: "5.2",
                title: "Data Retention",
                content: "We retain your personal information for as long as necessary to:",
                items: [
                    "Provide our Services and maintain your account",
                    "Comply with legal and regulatory requirements",
                    "Resolve disputes and enforce our agreements",
                    "Protect against fraud and abuse"
                ]
            },
            {
                id: "5.3",
                title: "International Data Transfers",
                content: "Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws."
            }
        ]
    },
    {
        id: "6",
        title: "YOUR PRIVACY RIGHTS",
        subsections: [
            {
                id: "6.1",
                title: "Access and Control",
                content: "You have the right to:",
                items: [
                    "Access your personal information we hold",
                    "Update and correct inaccurate information",
                    "Request deletion of your information (subject to legal requirements)",
                    "Restrict or object to certain processing activities",
                    "Receive a copy of your information in a portable format"
                ]
            },
            {
                id: "6.2",
                title: "Marketing Communications",
                content: "You can opt out of marketing communications by:",
                items: [
                    "Using unsubscribe links in emails",
                    "Updating your account preferences",
                    "Contacting us directly"
                ]
            },
            {
                id: "6.3",
                title: "Cookies and Tracking",
                content: "You can control cookies through your browser settings, but this may affect Platform functionality."
            }
        ]
    },
    {
        id: "7",
        title: "COOKIES AND TRACKING TECHNOLOGIES",
        subsections: [
            {
                id: "7.1",
                title: "Types of Cookies We Use",
                content: "Essential Cookies: Necessary for Platform operation and security Performance Cookies: Help us analyze Platform usage and performance Functional Cookies: Remember your preferences and settings Marketing Cookies: Used to deliver relevant advertisements"
            },
            {
                id: "7.2",
                title: "Third-Party Analytics",
                content: "We use analytics services to understand Platform usage and improve our Services. These services may collect information about your activities across different websites and platforms."
            }
        ]
    },
    {
        id: "8",
        title: "CHILDREN'S PRIVACY",
        content: "Our Services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete such information."
    },
    {
        id: "9",
        title: "UPDATES TO THIS PRIVACY POLICY",
        content: "We may update this Privacy Policy from time to time. Material changes will be communicated through:",
        items: [
            "Email notification to registered users",
            "Prominent notice on our Platform",
            "Updated effective date on this policy"
        ]
    },
    {
        id: "10",
        title: "CONTACT INFORMATION",
        subsections: [
            {
                id: "10.1",
                title: "General Inquiries",
                content: "For general questions about this Privacy Policy or our privacy practices: Email: support@nexfund.com Phone: [Phone number to be updated]"
            },
            {
                id: "10.2",
                title: "Regulatory Complaints",
                content: "If you have concerns about our data handling practices, you may also contact the relevant data protection authority in your jurisdiction."
            }
        ]
    },
    {
        id: "11",
        title: "DEFINITIONS",
        content: "Personal Information: Information that identifies, relates to, or could reasonably be linked with a particular individual. Processing: Any operation performed on personal information, including collection, use, storage, disclosure, and deletion. Controller: The entity that determines the purposes and means of processing personal information. Processor: An entity that processes personal information on behalf of a controller."
    }
];