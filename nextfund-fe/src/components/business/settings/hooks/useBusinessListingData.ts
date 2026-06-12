import { formatNumberWithCommas, shouldFormatNumber } from '@/utils/formatters';

export const useBusinessListingData = (listingData: any) => {
    const formatFieldValue = (value: string | number, fieldName: string) => {
        if (!value) return '';
        if (shouldFormatNumber(fieldName)) {
            return formatNumberWithCommas(value);
        }
        return value.toString();
    };

    // Funding Structure Data
    const fundingStructureData = listingData?.payload?.funding_structure ? [
        { 
            label: 'Funding Amount Seeking', 
            value: listingData.payload.funding_structure.funding_amount_seeking || '', 
            displayValue: formatFieldValue(listingData.payload.funding_structure.funding_amount_seeking, 'funding_amount_seeking') || 'Not Provided', 
            editable: true, 
            field: 'funding_amount_seeking' 
        },
        { 
            label: 'Funding Type', 
            value: listingData.payload.funding_structure.funding_type || '', 
            displayValue: listingData.payload.funding_structure.funding_type?.charAt(0).toUpperCase() + listingData.payload.funding_structure.funding_type?.slice(1) || 'Not Provided', 
            editable: true, 
            field: 'funding_type',
            select: true,
            options: [
                { label: 'Equity', value: 'equity' },
                { label: 'Debt', value: 'debt' },
                { label: 'Hybrid', value: 'hybrid' }
            ]
        },
        { 
            label: 'Instrument Type', 
            value: listingData.payload.funding_structure.instrument_type || '', 
            displayValue: listingData.payload.funding_structure.instrument_type === 'safe' ? 'SAFE (Simple Agreement for Future Equity)' 
                : listingData.payload.funding_structure.instrument_type === 'priced_round' ? 'Priced Round (Term Sheet)'
                : listingData.payload.funding_structure.instrument_type === 'revenue_share' ? 'Revenue Share Agreement'
                : listingData.payload.funding_structure.instrument_type || 'Not Provided',
            editable: true, 
            field: 'instrument_type',
            select: true,
            options: [
                { label: 'SAFE (Simple Agreement for Future Equity)', value: 'safe' },
                { label: 'Priced Round (Term Sheet)', value: 'priced_round' },
                { label: 'Revenue Share Agreement', value: 'revenue_share' }
            ]
        },
        { 
            label: 'Percentage Equity Offering', 
            value: listingData.payload.funding_structure.percentage_equity_offering || '', 
            displayValue: listingData.payload.funding_structure.percentage_equity_offering || 'Not Provided', 
            editable: true, 
            field: 'percentage_equity_offering' 
        },
        { 
            label: 'Current Valuation', 
            value: listingData.payload.funding_structure.current_valuation || '', 
            displayValue: formatFieldValue(listingData.payload.funding_structure.current_valuation, 'current_valuation') || 'Not Provided', 
            editable: true, 
            field: 'current_valuation' 
        },
        { 
            label: 'Interest Rate', 
            value: listingData.payload.funding_structure.interest_rate || '', 
            displayValue: listingData.payload.funding_structure.interest_rate || 'Not Provided', 
            editable: true, 
            field: 'interest_rate' 
        },
        {
            label: 'Intended Use of Funds',
            value: listingData.payload.funding_structure.intended_use_of_funds || '',
            displayValue: listingData.payload.funding_structure.intended_use_of_funds || 'Not Provided',
            editable: true,
            field: 'intended_use_of_funds',
            select: true,
            multiple: true,
            options: [
                { label: 'Product Development', value: 'Product Development' },
                { label: 'Marketing & Sales', value: 'Marketing & Sales' },
                { label: 'Team Expansion', value: 'Team Expansion' },
                { label: 'Technology & Infrastructure', value: 'Technology & Infrastructure' },
                { label: 'Working Capital', value: 'Working Capital' },
                { label: 'Market Expansion', value: 'Market Expansion' },
                { label: 'Other', value: 'Other' }
            ]
        },
    ] : [];

    // Company Metrics & Financial Information
    const companyMetricsData = listingData?.payload?.company_metrics_and_financial_information ? [
        { 
            label: 'Monthly Revenue', 
            value: listingData.payload.company_metrics_and_financial_information.monthly_revenue || '', 
            displayValue: formatFieldValue(listingData.payload.company_metrics_and_financial_information.monthly_revenue, 'monthly_revenue') || 'Not Provided', 
            editable: true, 
            field: 'monthly_revenue' 
        },
        { 
            label: 'Company Stage', 
            value: listingData.payload.company_metrics_and_financial_information.company_stage || '', 
            displayValue: listingData.payload.company_metrics_and_financial_information.company_stage || 'Not Provided', 
            editable: true, 
            field: 'company_stage' 
        },
        { 
            label: 'Gross Margin', 
            value: listingData.payload.company_metrics_and_financial_information.gross_margin || '', 
            displayValue: listingData.payload.company_metrics_and_financial_information.gross_margin || 'Not Provided', 
            editable: true, 
            field: 'gross_margin' 
        },
        { 
            label: 'Monthly Growth Rate', 
            value: listingData.payload.company_metrics_and_financial_information.monthly_growth_rate || '', 
            displayValue: listingData.payload.company_metrics_and_financial_information.monthly_growth_rate || 'Not Provided', 
            editable: true, 
            field: 'monthly_growth_rate' 
        },
        { 
            label: 'Number of Customers', 
            value: listingData.payload.company_metrics_and_financial_information.number_of_customers || '', 
            displayValue: listingData.payload.company_metrics_and_financial_information.number_of_customers || 'Not Provided', 
            editable: true, 
            field: 'number_of_customers' 
        },
        { 
            label: 'Team Size', 
            value: listingData.payload.company_metrics_and_financial_information.team_size || '', 
            displayValue: listingData.payload.company_metrics_and_financial_information.team_size || 'Not Provided', 
            editable: true, 
            field: 'team_size' 
        },
        { 
            label: 'Burn Rate', 
            value: listingData.payload.company_metrics_and_financial_information.burn_rate || '', 
            displayValue: listingData.payload.company_metrics_and_financial_information.burn_rate || 'Not Provided', 
            editable: true, 
            field: 'burn_rate' 
        },
        { 
            label: 'Months of Runway', 
            value: listingData.payload.company_metrics_and_financial_information.months_of_runway || '', 
            displayValue: listingData.payload.company_metrics_and_financial_information.months_of_runway || 'Not Provided', 
            editable: true, 
            field: 'months_of_runway' 
        },
        { 
            label: 'Previous Funding', 
            value: listingData.payload.company_metrics_and_financial_information.previous_funding || '', 
            displayValue: listingData.payload.company_metrics_and_financial_information.previous_funding || 'Not Provided', 
            editable: true, 
            field: 'previous_funding',
            select: true,
            options: [
                { label: 'Angel Investment', value: 'Angel Investment' },
                { label: 'Friends & Family', value: 'Friends & Family' },
                { label: 'Seed Round', value: 'Seed Round' },
                { label: 'Series A', value: 'Series A' },
                { label: 'Series B', value: 'Series B' },
                { label: 'Series C+', value: 'Series C+' },
                { label: 'Government Grant', value: 'Government Grant' },
                { label: 'Crowdfunding', value: 'Crowdfunding' },
                { label: 'Revenue Based Financing', value: 'Revenue Based Financing' }
            ]
        },
        { 
            label: 'Total Previous Funding', 
            value: listingData.payload.company_metrics_and_financial_information.total_previous_funding || '', 
            displayValue: listingData.payload.company_metrics_and_financial_information.total_previous_funding || 'Not Provided', 
            editable: true, 
            field: 'total_previous_funding' 
        },
    ] : [];

    // Use of Funds Data
    const useOfFundsData = listingData?.payload?.use_of_funds ? [
        { 
            label: 'Product Development', 
            value: listingData.payload.use_of_funds.product_development || '', 
            displayValue: listingData.payload.use_of_funds.product_development || 'Not Provided', 
            editable: true, 
            field: 'product_development' 
        },
        { 
            label: 'Marketing & Sales', 
            value: listingData.payload.use_of_funds.marketing_and_sales || '', 
            displayValue: listingData.payload.use_of_funds.marketing_and_sales || 'Not Provided', 
            editable: true, 
            field: 'marketing_and_sales' 
        },
        { 
            label: 'Team Expansion', 
            value: listingData.payload.use_of_funds.team_expansion || '', 
            displayValue: listingData.payload.use_of_funds.team_expansion || 'Not Provided', 
            editable: true, 
            field: 'team_expansion' 
        },
        { 
            label: 'Working Capital', 
            value: listingData.payload.use_of_funds.working_capital || '', 
            displayValue: listingData.payload.use_of_funds.working_capital || 'Not Provided', 
            editable: true, 
            field: 'working_capital' 
        },
        { 
            label: 'Market Expansion', 
            value: listingData.payload.use_of_funds.market_expansion || '', 
            displayValue: listingData.payload.use_of_funds.market_expansion || 'Not Provided', 
            editable: true, 
            field: 'market_expansion' 
        },
        { 
            label: 'Technology Infrastructure', 
            value: listingData.payload.use_of_funds.technology_infrastructure || '', 
            displayValue: listingData.payload.use_of_funds.technology_infrastructure || 'Not Provided', 
            editable: true, 
            field: 'technology_infrastructure' 
        },
        { 
            label: 'Others', 
            value: listingData.payload.use_of_funds.others || '', 
            displayValue: listingData.payload.use_of_funds.others || 'Not Provided', 
            editable: true, 
            field: 'others' 
        },
        { 
            label: 'Funds Deployment Timeline (Months)', 
            value: listingData.payload.use_of_funds.funds_deployment_timeline || '', 
            displayValue: listingData.payload.use_of_funds.funds_deployment_timeline || 'Not Provided', 
            editable: true, 
            field: 'funds_deployment_timeline' 
        },
        { 
            label: 'Expected Funding Completion', 
            value: listingData.payload.use_of_funds.expected_funding_completion || '', 
            displayValue: listingData.payload.use_of_funds.expected_funding_completion || 'Not Provided', 
            editable: true, 
            field: 'expected_funding_completion',
            type: 'date'
        },
        { 
            label: 'Key Milestones to Achieve with Funding', 
            value: listingData.payload.use_of_funds.key_milestone_to_achieve_with_funding || '', 
            displayValue: listingData.payload.use_of_funds.key_milestone_to_achieve_with_funding || 'Not Provided', 
            editable: true, 
            field: 'key_milestone_to_achieve_with_funding',
            multiline: true
        },
    ] : [];

    // Compliance & Verification Data
    const complianceData = listingData?.payload?.compliance_and_verification ? [
        { 
            label: 'Registration Number', 
            value: listingData.payload.compliance_and_verification.registration_number || '', 
            displayValue: listingData.payload.compliance_and_verification.registration_number || 'Not Provided', 
            editable: true, 
            field: 'registration_number' 
        },
        { 
            label: 'Tax ID Number', 
            value: listingData.payload.compliance_and_verification.tax_id_number || '', 
            displayValue: listingData.payload.compliance_and_verification.tax_id_number || 'Not Provided', 
            editable: true, 
            field: 'tax_id_number' 
        },
        { 
            label: 'Registered Address', 
            value: listingData.payload.compliance_and_verification.registered_address || '', 
            displayValue: listingData.payload.compliance_and_verification.registered_address || 'Not Provided', 
            editable: true, 
            field: 'registered_address',
            multiline: true
        },
        { 
            label: 'Interest Structure', 
            value: listingData.payload.compliance_and_verification.interest_structure || '', 
            displayValue: listingData.payload.compliance_and_verification.interest_structure || 'Not Provided', 
            editable: true, 
            field: 'interest_structure' 
        },
        { 
            label: 'Legally Incorporated', 
            value: listingData.payload.compliance_and_verification.legally_incorporated ? 'Yes' : 'No' 
        },
        { 
            label: 'Authorized to Raise Capital', 
            value: listingData.payload.compliance_and_verification.authorized_to_raise_capital ? 'Yes' : 'No' 
        },
        { 
            label: 'Founders Equity Agreement', 
            value: listingData.payload.compliance_and_verification.founders_equity_agreement ? 'Yes' : 'No' 
        },
        { 
            label: 'Pending Legal Disputes', 
            value: listingData.payload.compliance_and_verification.pending_legal_disputes ? 'Yes' : 'No' 
        },
        { 
            label: 'Local Securities Regulations', 
            value: listingData.payload.compliance_and_verification.local_securities_regulations ? 'Yes' : 'No' 
        },
    ] : [];

    // Investment Preference Data
    const investmentPreferenceData = listingData?.payload?.investment_preference ? [
        { 
            label: 'Minimum Investment', 
            value: listingData.payload.investment_preference.minimum_investment?.toString() || '', 
            displayValue: formatFieldValue(listingData.payload.investment_preference.minimum_investment?.toString() || '', 'minimum_investment') || 'Not Provided', 
            editable: true, 
            field: 'minimum_investment' 
        },
        { 
            label: 'Maximum Investment', 
            value: listingData.payload.investment_preference.maximum_investment?.toString() || '', 
            displayValue: formatFieldValue(listingData.payload.investment_preference.maximum_investment?.toString() || '', 'maximum_investment') || 'Not Provided', 
            editable: true, 
            field: 'maximum_investment' 
        },
        { 
            label: 'Maximum Number of Investors', 
            value: listingData.payload.investment_preference.maximum_number_of_investors?.toString() || '', 
            displayValue: listingData.payload.investment_preference.maximum_number_of_investors?.toString() || 'Not Provided', 
            editable: true, 
            field: 'maximum_number_of_investors' 
        },
        { 
            label: 'Geographic Preference', 
            value: listingData.payload.investment_preference.geographic_preference || '', 
            displayValue: listingData.payload.investment_preference.geographic_preference || 'Not Provided', 
            editable: true, 
            field: 'geographic_preference' 
        },
        { 
            label: 'Expected Close Date', 
            value: listingData.payload.investment_preference.expected_close_date || '', 
            displayValue: listingData.payload.investment_preference.expected_close_date || 'Not Provided', 
            editable: true, 
            field: 'expected_close_date',
            type: 'date'
        },
        { 
            label: 'Funding Round Duration', 
            value: listingData.payload.investment_preference.funding_round_duration || '', 
            displayValue: listingData.payload.investment_preference.funding_round_duration || 'Not Provided', 
            editable: true, 
            field: 'funding_round_duration' 
        },
        { 
            label: 'Investor Updates Frequency', 
            value: listingData.payload.investment_preference.investor_updates_frequency || '', 
            displayValue: listingData.payload.investment_preference.investor_updates_frequency || 'Not Provided', 
            editable: true, 
            field: 'investor_updates_frequency' 
        },
        { 
            label: 'Due Diligence Timeline', 
            value: listingData.payload.investment_preference.due_diligence_timeline || '', 
            displayValue: listingData.payload.investment_preference.due_diligence_timeline || 'Not Provided', 
            editable: true, 
            field: 'due_diligence_timeline' 
        },
        { 
            label: 'Board Seat Offering', 
            value: listingData.payload.investment_preference.board_seat_offering || '', 
            displayValue: listingData.payload.investment_preference.board_seat_offering || 'Not Provided', 
            editable: true, 
            field: 'board_seat_offering' 
        },
    ] : [];

    return {
        fundingStructureData,
        companyMetricsData,
        useOfFundsData,
        complianceData,
        investmentPreferenceData,
    };
};
