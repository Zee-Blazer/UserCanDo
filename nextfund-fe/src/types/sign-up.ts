
export interface HybridFundingData {
    equityPortion: number;
    equityComponent: {
        repaymentSchedule: 'SAFE' | 'Priced Round' | 'Revenue Share';
        equityPercentage: string;
    };
    debtComponent: {
        type: 'Convertible Note' | 'Traditional Debt';
        interestRate: string;
        maturityPeriod?: string;
        repaymentTerm?: string;
        conversionDiscount?: string;
        valuationCap?: string;
        security?: 'Secured' | 'Unsecured';
        repaymentSchedule?: 'Monthly' | 'Quarterly' | 'Annually';
    };
    conversionOptions: {
        allowDebtToEquityConversion: boolean;
        performanceBasedTriggers: boolean;
        timeBasedOptions: boolean;
    };
}

export interface CompanyMetricsData {
    companyStage: string;
    grossMargin: string;
    burnRate: string;
    monthsOfRunway: string;
    monthlyRevenue: string;
    monthlyGrowthRate: string;
    numberOfCustomers: string;
    teamSize: string;
    previousFunding: string;
    totalPreviousFunding: string;
    financialStatementsText?: string;
    teamMembers: Array<{
        id: string;
        first_name: string;
        last_name: string;
        role: string;
        description: string;
    }>;
}

export interface ReviewApplicationData {
    company: {
        name: string;
        amount: string;
        type: string;
        stage: string;
        industry: string;
    };
    useOfFunds: string[];
}

export interface UseOfFundsData {
    fundingBreakdown: {
        productDevelopment: number;
        marketingSales: number;
        teamExpansion: number;
        technologyInfrastructure: number;
        workingCapital: number;
        marketExpansion: number;
        other: number;
    };
    timeline: {
        expectedFundingCompletion: string;
        fundsDeploymentTimeline: string;
    };
    milestones: string;
}

export interface UploadedFile {
    id: string;
    name: string;
    size: number;
    type: string;
}

export interface FinalizeApplicationData {
    documents: Record<string, UploadedFile>;
}

export interface ComplianceVerificationData {
    regulatoryInfo: {
        interestStructure: string;
        registrationNumber: string;
        taxIdNumber: string;
        registeredAddress: string;
    };
    complianceChecklist: {
        legallyIncorporated: boolean;
        clearEquityAgreements: boolean;
        noPendingDisputes: boolean;
        authorizedToRaise: boolean;
        securitiesCompliance: boolean;
    };
    documents: {
        certificateOfIncorporation: File | null;
        founderAgreements: File | null;
        legalComplianceCertificate: File | null;
    };
    declarations: {
        accurateInfo: boolean;
        authorityToRaise: boolean;
        termsAgreement: boolean;
    };
}

export interface InvestmentTermsData {
    minimumInvestment: string;
    maximumInvestment: string;
    maximumInvestors: string;
    geographicPreference: string;
    fundingRoundDuration: string;
    expectedCloseDate: string;
    dueDiligenceTimeline: string;
    investorTypePreference: string;
    boardSeatOffering: 'yes' | 'no' | '';
    investorUpdatesFrequency: 'monthly' | 'quarterly' | '';
    antiDilutionRights: 'yes' | 'no' | '';
}

export interface ApplicationSummaryData {
    company: {
        name: string;
        industry: string;
        foundedYear: string;
        stage: string;
        employeeCount: string;
    };
    funding: {
        type: string;
        amount: string;
        equityOffering: string;
        duration: string;
        closeDate: string;
    };
    useOfFunds: string[];
    investorPreferences: {
        minInvestment: string;
        maxInvestment: string;
        investorTypes: string[];
    };
}
