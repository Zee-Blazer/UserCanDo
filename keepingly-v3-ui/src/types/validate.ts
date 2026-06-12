import {
	AddPropertyProps,
	AgentProps,
	AppraiserFormProps,
	ExpenseFormProps,
	InventoryFormProps,
	LoginProps,
	RenovationFormProps,
	ResetProps,
	SignupProps,
} from ".";

export const validateLoginForm = (formData: LoginProps | null) => {
	let errors: LoginProps = {};
	if (!formData?.email || !/\S+@\S+\.\S+/.test(formData?.email)) {
		errors.email = "Invalid email address";
	}

	if (!formData?.password) {
		errors.password = "Password is required";
	}

	return errors;
};

export const validateSignup = (formData: SignupProps | null) => {
	let errors: SignupProps = {};

	if (!formData?.email || !/\S+@\S+\.\S+/.test(formData?.email)) {
		errors.email = "Invalid email address";
	}

	if (!formData?.first_name) {
		errors.first_name = "First Name is required";
	}

	if (!formData?.last_name) {
		errors.last_name = "Last Name is required";
	}

	if (!formData?.password) {
		errors.password = "Password is required";
	} else if (formData.password.length < 8) {
		errors.password = "Password must be at least 8 characters long";
	}

	if (!formData?.confirm_password) {
		errors.confirm_password = "Confirm Password is required";
	} else if (formData.password !== formData.confirm_password) {
		errors.confirm_password = "Passwords do not match";
	}

	// if (!formData?.state) {
	// 	errors.state = "State is required";
	// }
	// if (!formData?.license) {
	// 	errors.license = "License number is required";
	// }

	return errors;
};

export const validateResetPasswordForm = (formData: ResetProps | null) => {
	let errors: ResetProps = {};

	if (!formData?.password) {
		errors.password = "Password is required";
	} else if (formData.password.length < 8) {
		errors.password = "Password must be at least 8 characters long";
	}

	if (!formData?.confirm_password) {
		errors.confirm_password = "Confirm Password is required";
	} else if (formData.password !== formData.confirm_password) {
		errors.confirm_password = "Passwords do not match";
	}

	return errors;
};

export const validateAddAgent = (formData: AgentProps | null) => {
	let errors: AgentProps = {};

	if (!formData?.first_name) {
		errors.first_name = "First name is required";
	}
	if (!formData?.last_name) {
		errors.last_name = "Last name is required";
	}
	if (!formData?.email || !/\S+@\S+\.\S+/.test(formData?.email)) {
		errors.email = "Invalid email address";
	}
	if (!formData?.role) {
		errors.role = "Role is required";
	}
	if (!formData?.state) {
		errors.state = "State is required";
	}

	return errors;
};

export const validatePropertyStep1 = (formData: AddPropertyProps | null) => {
	let errors: AddPropertyProps = {};

	if (!formData?.address) {
		errors.address = "Address is required";
	}
	if (!formData?.city) {
		errors.city = "City is required";
	}
	if (!formData?.state) {
		errors.state = "State is required";
	}
	if (!formData?.zipcode) {
		errors.zipcode = "Zip code is required";
	}
	if (formData?.zipcode && formData?.zipcode.length < 5) {
		errors.zipcode = "Zip code must be five numbers";
	}
	// if (!formData?.first_name) {
	// 	errors.first_name = "First name is required";
	// }
	// if (!formData?.last_name) {
	// 	errors.last_name = "Last name is required";
	// }
	// if (!formData?.middle_name) {
	// 	errors.middle_name = "Last name is required";
	// }
	// if (!formData?.email || !/\S+@\S+\.\S+/.test(formData?.email)) {
	// 	errors.email = "Invalid email address";
	// }
	// if (!formData?.phone_number) {
	// 	errors.phone_number = "Phone number is required";
	// }
	// if (!formData?.mobile_number) {
	// 	errors.mobile_number = "Mobile number is required";
	// }

	return errors;
};
export const validatePropertyStep2 = (formData: AddPropertyProps | null) => {
	let errors: AddPropertyProps = {};

	if (!formData?.closing_price) {
		//@ts-ignore
		errors.closing_price = "Closing price is required";
	}

	return errors;
};

export const validateAddExpense = (formData: ExpenseFormProps | null) => {
	let errors: ExpenseFormProps = {};

	if (!formData?.amount) {
		errors.amount = "Amount is required";
	}
	if (!formData?.expense_type) {
		errors.expense_type = "Expense type is required";
	}
	if (!formData?.name) {
		errors.name = "Expense name is required";
	}
	if (!formData?.paid_to) {
		errors.paid_to = "Paid to is required";
	}

	return errors;
};

export const validateAddAppraiser = (formData: AppraiserFormProps | null) => {
	let errors: AppraiserFormProps = {};

	if (!formData?.name) {
		errors.name = "Appraiser name is required";
	}
	if (!formData?.email || !/\S+@\S+\.\S+/.test(formData?.email)) {
		errors.email = "Invalid email address";
	}

	return errors;
};

export const validateAddRenovations = (
	formData: RenovationFormProps | null
) => {
	let errors: RenovationFormProps = {};

	if (!formData?.renovation_name) {
		errors.renovation_name = "Renovation name is required";
	}
	// if (!formData?.close_date) {
	// 	errors.close_date = "Closing date is required";
	// }
	if (!formData?.start_date) {
		errors.start_date = "Starting date is required";
	}
	return errors;
};

export const validateEditRenovations = (
	formData: RenovationFormProps | null
) => {
	let errors: RenovationFormProps = {};

	if (!formData?.renovation_name) {
		errors.renovation_name = "Renovation name is required";
	}
	if (!formData?.close_date) {
		errors.close_date = "Closing date is required";
	}
	if (!formData?.start_date) {
		errors.start_date = "Starting date is required";
	}
	return errors;
};

export const validateAddInventory = (formData: InventoryFormProps | null) => {
	let errors: InventoryFormProps = {};

	if (!formData?.name) {
		errors.name = "Inventory name is required";
	}

	if (!formData?.description) {
		errors.description = "Description is required";
	}

	if (!formData?.purchase_date) {
		errors.purchase_date = "Purchase is required";
	}

	if (!formData?.purchase_price) {
		//@ts-ignore
		errors.purchase_price = "Purchase price is required";
	}

	if (!formData?.quantity) {
		//@ts-ignore
		errors.quantity = "Quantity is required";
	}

	if (formData?.quantity && formData.quantity < 1) {
		//@ts-ignore
		errors.quantity = "Quantity Cannot be less than 1";
	}

	return errors;
};
