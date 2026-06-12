import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "https://api.dev.nexfundafrica.com/api/v1";
export const api = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const api2 = axios.create({
    baseURL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

// Business application endpoints
export const businessApi = {
    // Submit complete business application
    submitCompleteApplication: async (applicationData: any) => {
        try {
            console.log('Submitting complete business application with all collected data');

            // Format the data according to the /register_business endpoint requirements
            const businessData = {
                company_name: applicationData.business.companyName,
                industry_sector: applicationData.business.industry,
                year_founded: applicationData.business.yearFounded,
                country_location: applicationData.business.countryName || applicationData.business.country,
                headquarters: applicationData.business.headquarters,
                company_size: applicationData.business.companySize,
                current_stage: applicationData.business.currentStage,
                description: applicationData.business.briefDescription,
                market_opportunity_description: applicationData.business.marketOpportunityDescription,
                competitive_advantage_description: applicationData.business.competitive_advantage_description,
                website_url: applicationData.business.websiteUrl,
                first_name: applicationData.business.firstName,
                last_name: applicationData.business.lastName,
                linked_in_profile: applicationData.business.linkedinProfile,
                email: applicationData.business.emailAddress,
                phone_number: applicationData.business.phoneNumber,
                password: applicationData.business.password,
            };

            console.log('Business registration data:', businessData);
            console.log('Additional application data:', {
                funding: applicationData.funding,
                options: applicationData.options,
                hybridFunding: applicationData.hybridFunding,
                companyMetrics: applicationData.companyMetrics,
                useOfFunds: applicationData.useOfFunds,
                finalizeApplication: applicationData.finalizeApplication,
                complianceVerification: applicationData.complianceVerification,
                investmentTerms: applicationData.investmentTerms,
            });

            // Register the business with all the collected data
            const response = await api.post('/register_business', businessData);

            console.log('Business registration successful:', response.data);

            // Return success with the business ID and additional data
            return {
                ...response.data,
                message: 'Business registered successfully with complete application data',
                additionalData: {
                    funding: applicationData.funding,
                    options: applicationData.options,
                    hybridFunding: applicationData.hybridFunding,
                    companyMetrics: applicationData.companyMetrics,
                    useOfFunds: applicationData.useOfFunds,
                    finalizeApplication: applicationData.finalizeApplication,
                    complianceVerification: applicationData.complianceVerification,
                    investmentTerms: applicationData.investmentTerms,
                }
            };
        } catch (error) {
            throw error;
        }
    },

    // Get business application status
    getApplicationStatus: async (businessId: string) => {
        try {
            const response = await api.get(`/business/${businessId}/application_status`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

api.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("access_token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);

api2.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        console.error("Request error:", error);
        return Promise.reject(error);
    }
);
