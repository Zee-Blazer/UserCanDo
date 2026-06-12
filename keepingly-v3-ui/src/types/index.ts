import { Dispatch, ReactNode } from "react";

export interface AppProps {
	auth: ReactNode;
	broker: ReactNode;
	appraiser: ReactNode;
	homeowner: ReactNode;
}

export interface PackageProps {
	price: number;
	title: string;
	description?: string;
	img: string;
	id: string;
}

export interface LoginProps {
	email?: string;
	password?: string;
}

export interface SignupProps {
	email?: string;
	password?: string;
	state?: string;
	first_name?: string;
	license?: string;
	last_name?: string;
	confirm_password?: string;
	role?: string;
	broker_name?: string;
	mobile_numebr?: string;
}

export interface AgentItemProps {
	email: string;
	state: string;
	first_name: string;
	license_details: string;
	last_name: string;
	broker_name: string;
	role: string;
	profile_image: string;
	user_id: string;
	is_suspended: boolean;
}

export interface AgentProps {
	email?: string;
	state?: string;
	first_name?: string;
	license_details?: string;
	last_name?: string;
	role?: string;
	image_url?: File | string | null;
}

export interface ExpenseFormProps {
	property?: string;
	name?: string;
	paid_to?: string;
	expense_type?: string;
	amount?: number | string;
	expense_receipt_url?: any;
}

export interface RenovationFormProps {
	renovation_name?: string;
	start_date?: string;
	close_date?: string;
}

export interface RenovationListProps {
	close_date: string;
	start_date: string;
	renovation_name: string;
	status: string;
	id: string;
	during_photos_video: DocProps[];
	after_photos_video: DocProps[];
	before_photo_video: DocProps[];
	expenses_list: ExpenseListProps[];
	is_appraiser_renovation: boolean;
}

export interface ResetProps {
	email?: string;
	password?: string;
	confirm_password?: string;
}

export interface ReveiwSectionProps {
	action: () => void;
}

export interface ModalProps {
	open: boolean;
	handleOpen: Dispatch<boolean>;
	closeModal: () => void;
	action?: () => void;
	loading?: boolean;
}

export interface ViewModalProps extends ModalProps {
	url: string;
	type: string;
	isPhoto: boolean;
	id: string;
	isVideo?: boolean;
}

export interface DocProps {
	file_type: string;
	id: string;
	is_document: boolean;
	is_video: boolean;
	name: string;
	url: string;
	category: string;
	sub_category: string;
	file_size: string;
	is_appraiser_document: boolean;
	thumbnail_blob_name: string;
}

export interface CommissionProps {
	up_to?: number;
	commission?: number;
	above?: number;
	is_last?: boolean;
}

export interface OverviewProps {
	expenses_list: any[];
	property_count: number;
	renovations: number;
	total_broker_user: number;
	total_commission: number;
	user_id?: string;
	total_invites: number;
	total_invites_accepeted: number;
	total_invites_pending: number;
	weekly_invites: { label: string; value: string }[];
}

export interface AddPropertyProps {
	city?: string;
	state?: string;
	address?: string;
	zipcode?: string;
	first_name?: string;
	last_name?: string;
	email?: string;
	phone_number?: string;
	mobile_number?: string;
	photos_videos_url?: any[];
	document_url?: any[];
	middle_name?: string;
	tiers?: CommissionProps[];
	closing_price?: number;
	total_commission?: number;
	id?: string;
}

export interface PropertyProps extends AddPropertyProps {
	user: string;
	cover_photo_url: DocProps[];
}

export interface AddressProps {
	zipcode?: string;
	address?: string;
	city?: string;
	state?: string;
}

export interface DocumentTypeProps {
	category: string;
	sub_categories: string[];
}

export interface ExpenseListProps {
	amount: number;
	expense_receipt_url: string;
	expense_type: string;
	id: string;
	name: string;
	paid_to: string;
	property: string;
	total_expenses: number;
	user_id: string | null;
}

export interface NoteListProps {
	note: string;
	id: string;
	date: string;
}

export interface CheckListProps {
	check_type: string;
	document_category: string;
	document_sub_category: string;
	due_date: string;
	id: string;
	property_id: string;
	status: string;
	task_description: string;
	task_name: string;
}

export interface KeeptrackScoreProps {
	score: number;
	score_increase_from_next_document_checklist: number;
	score_increase_from_next_maintenance_12_months: number;
	score_increase_from_next_maintenance_12_months_prior_last_12_months: number;
	score_increase_from_next_movin_checklist: number;
}

export interface CheklistQueryProps {
	status?: "complete" | "active" | "";
	task_type?:
		| "move_in_checklist"
		| "maintenance_checklist"
		| "document_upload_checklist"
		| "";
}

export interface InventoryFormProps {
	property?: string;
	name?: string;
	description?: string;
	purchase_date?: string;
	purchase_price?: number;
	quantity?: number;
	is_appliance?: boolean;
	brand?: string;
	model_number?: string;
	serial_number?: string;
	warranty_end_date?: string;
	is_expense_item?: boolean;
	upload_receipt_url?: File;
	upload_warranty_url?: File;
	inventory_upload_photo_video_url?: File;
	manual?: File;
}

export interface InventoryListProps {
	id: string;
	name: string;
	description: string;
	brand: string | null;
	model_number: string | null;
	serial_number: string | null;
	is_appliance: boolean;
	is_expense_item: boolean;
	purchase_date: string;
	purchase_price: number;
	quantity: number;
	property: string;
	user: string;
	warranty_end_date: string | null;
	inventory_photo_video_url: DocProps[];
	upload_receipt_url: DocProps[];
	upload_warranty_url: DocProps[];
	inventory_documents: DocProps[];
}

export interface ChangePasswordFormProps {
	password?: string;
	confirm_password?: string;
	current_password?: string;
}

export interface UserProps {
	email?: string;
	first_name?: string;
	last_name?: string;
	phone_number?: string | null;
	profile_url?: string | null;
	role?: string;
	state?: string | null;
	user_id?: string;
}

export interface AuthorisedUserProps {
	email?: string;
	first_name?: string;
	last_name?: string;
	phone_number?: string;
	middle_name?: string;
	id?: string;
}
export interface DeletedItemsProps {
	deletion_timestamp: string;
	id: string;
	identifier: string;
	type: string;
}
export interface TaskCheckCompProps {
	property_id: string;
	task_id: string;
	isCompleted: boolean;
	type: string;
	category?: string;
	subCategory?: string;
}

export interface AppraiserFormProps {
	name?: string;
	last_name?: string;
	email?: string;
	documents?: string[];
	property_id?: string;
	comments?: string;
}

export interface AppraiserUserData {
	name: string;
	email: string;
	id: string;
	is_open: boolean;
}
