export interface LoginApiResponse {
	is_success: boolean;
	message: string;
	payload: {
		user_id: string;
		email: string;
		first_name: string;
		last_name: string;
		is_verified: boolean;
		avatar?: string | null;
		user_type: string;
		role: string;
		change_password?: boolean;
		is_business: boolean;
		business_id: string;
		access_token: string;
		refresh_token: string;
		is_listing_created?: boolean;
		investor_type?: string;
		is_first_login?: boolean;
	};
}
