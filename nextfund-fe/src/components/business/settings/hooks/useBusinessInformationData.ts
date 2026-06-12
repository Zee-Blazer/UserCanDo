
import { InfoItem } from '@/components/business/settings/edit-info';
import { getCountryByCode } from '@/constants/countries';
import { GetBusinessResponse } from '@/types/queries-type';

export const useBusinessInformationData = (
	businessData?: GetBusinessResponse | null
): InfoItem[] => {
	if (!businessData || !businessData.payload) return [];

	const payload = businessData.payload;

	const countryObj = payload.country_location
		? getCountryByCode(payload.country_location)
		: undefined;
	const countryDisplay = countryObj ? countryObj.name : (payload.country_location || 'N/A');

	const info: InfoItem[] = [
		{
			label: 'Company Name',
			value: payload.company_name || '',
			displayValue: payload.company_name || 'N/A',
			editable: true,
			field: 'company_name',
		},
		{
			label: 'Industry Sector',
			value: payload.industry_sector || '',
			displayValue: payload.industry_sector || 'N/A',
			editable: true,
			field: 'industry_sector',
		},
		{
			label: 'Year Founded',
			value: payload.year_founded?.toString?.() || '',
			displayValue: payload.year_founded?.toString?.() || 'N/A',
			editable: true,
			field: 'year_founded',
		},
		{
			label: 'Headquarters',
			value: payload.headquarters || '',
			displayValue: payload.headquarters || 'N/A',
			editable: true,
			field: 'headquarters',
		},
		{
			label: 'Country',
			value: payload.country_location || '',
			displayValue: countryDisplay,
			editable: true,
			field: 'country_location',
			custom: true,
		},
		{
			label: 'Company Size',
			value: payload.company_size || '',
			displayValue: payload.company_size || 'N/A',
			editable: true,
			field: 'company_size',
		},
		{
			label: 'Current Stage',
			value: payload.current_stage || '',
			displayValue: payload.current_stage || 'N/A',
			editable: true,
			field: 'current_stage',
		},
		{
			label: 'Description',
			value: payload.description || '',
			displayValue: payload.description || 'N/A',
			multiline: true,
			editable: true,
			field: 'description',
		},
		{
			label: 'Website',
			value: payload.website_url || '',
			displayValue: payload.website_url || 'N/A',
			editable: true,
			field: 'website_url',
		},
		{
			label: 'LinkedIn',
			value: payload.linked_in_profile || '',
			displayValue: payload.linked_in_profile || 'N/A',
			editable: true,
			field: 'linked_in_profile',
		},
		{
			label: 'Phone Number',
			value: payload.phone_number || '',
			displayValue: payload.phone_number || 'N/A',
			editable: true,
			field: 'phone_number',
			type: 'tel',
		},
		{
			label: 'Market Opportunity',
			value: payload.market_opportunity || '',
			displayValue: payload.market_opportunity || 'N/A',
			multiline: true,
			editable: true,
			field: 'market_opportunity_description',
		},
		{
			label: 'Competitive Advantage',
			value: payload.competitive_advantage || '',
			displayValue: payload.competitive_advantage || 'N/A',
			multiline: true,
			editable: true,
			field: 'competitive_advantage_description',
		},
	];

	return info;
};
