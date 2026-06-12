interface UserProps {
	email?: string;
	first_name?: string;
	last_name?: string;
	phone_number?: string | null;
	profile_url?: string | null;
	role?: string;
	state?: string | null;
	user_id?: string;
}

interface AuthSlideProps {
	prevSlide: () => void;
	nextSlide: () => void;
	handleSlideChange?: (index: number) => void;
	activeSlideIndex?: number;
}

interface ModalProps {
	open: boolean;
	handleOpen: Dispatch<boolean>;
	closeModal: () => void;
	loading?: boolean;
	actionFunc?: boolean;
}

interface CheckoutFormProps {
	payment_option: string;
	pay_later_2_weeks_option: string;
	pay_later_4_weeks_option: string;
	pay_later_weekly_option: string;
	payment_method: string;
	card_last_four_digits: string;
	delivery_address: string;
	delivery_method: string;
}
