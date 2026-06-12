import { ulid } from "ulid";

export const generateId = () => {
	return ulid();
};

export const formatTime = (dateString: string) => {
	const options: any = {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	};
	const date = new Date(dateString);
	return date.toLocaleString("en-US", options);
};

export const formatDate = (dateString: string) => {
	const options: Intl.DateTimeFormatOptions = {
		dateStyle: "medium",
	};

	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", options);
};

export const formatFileSize = (bytes: number) => {
	if (bytes >= 1024 ** 2) {
		return `${(bytes / 1024 ** 2).toFixed(2)} MB`;
	} else if (bytes >= 1024) {
		return `${(bytes / 1024).toFixed(0)} KB`;
	} else {
		return `${bytes} bytes`;
	}
};

export const formatCurrency = (number: number) => {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	}).format(number);
};
