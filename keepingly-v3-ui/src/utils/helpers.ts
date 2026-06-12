import { platform as tauriPlatform } from "@tauri-apps/plugin-os";
import {
	CheckListProps,
	ExpenseListProps,
	InventoryListProps,
	KeeptrackScoreProps,
} from "@/types";
import { ulid } from "ulid";
import { baseURL } from "@/api";

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

export const daysUntil = (dateString: string) => {
	const targetDate = new Date(dateString);
	const currentDate = new Date();
	if (currentDate > targetDate) {
		return "Priority";
	}
	const diffInTime = targetDate.getTime() - currentDate.getTime();
	const diffInDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
	return `${diffInDays} days`;
};

export const isMoreThan12MonthsAway = (dateString: string) => {
	const targetDate = new Date(dateString);
	const currentDate = new Date();
	const date12MonthsLater = new Date(
		currentDate.setFullYear(currentDate.getFullYear() + 1)
	);
	return targetDate > date12MonthsLater;
};

export const getTasks = (
	checklist: CheckListProps[],
	keeptrackScore: KeeptrackScoreProps
) => {
	const tasks = checklist?.map((task) => {
		const isMoreThan12Months = isMoreThan12MonthsAway(task?.due_date);
		const upload = task.check_type === "document_upload_checklist";
		const movein = task?.check_type === "move_in_checklist";
		const maintenance = task?.check_type === "maintenance_checklist";
		const dueDate = daysUntil(task?.due_date);

		const maintenancePoint = !isMoreThan12Months
			? keeptrackScore?.score_increase_from_next_maintenance_12_months
			: keeptrackScore?.score_increase_from_next_maintenance_12_months_prior_last_12_months;

		const moveInPoint =
			keeptrackScore?.score_increase_from_next_movin_checklist;

		const documentPoint =
			keeptrackScore?.score_increase_from_next_document_checklist;

		const returnData = {
			task: task.task_name,
			description: task.task_description,
			status: task.status,
			type: upload
				? "Document upload checklist"
				: movein
				? "Move-in checklist"
				: maintenance
				? "Maintenance checklist"
				: "Checklist",
			dueDate,
			id: task?.id,

			point: upload
				? documentPoint
				: movein
				? moveInPoint
				: maintenance
				? maintenancePoint
				: "",
			category: task?.document_category,
			subCategory: task?.document_sub_category,
		};
		return returnData;
	});
	return tasks;
};

export const getTotalExpense = (expenses: ExpenseListProps[]) => {
	return expenses?.reduce((total, expense) => total + expense.amount, 0);
};
export const getTotalInventory = (inventories: InventoryListProps[]) => {
	return inventories?.reduce((total, inv) => total + inv.purchase_price, 0);
};

export const detectPlatform = async (): Promise<boolean> => {
	try {
		// First try to use Tauri's platform detection
		const plat = await tauriPlatform();
		return plat === "ios" || plat === "android";
	} catch {
		// Fallback to browser-based detection if Tauri is not available
		const userAgent = window.navigator.userAgent.toLowerCase();
		const mobileKeywords = [
			"android",
			"iphone",
			"ipad",
			"ipod",
			"webos",
			"windows phone",
		];

		// Check if any mobile keywords are in the user agent
		const isMobileDevice = mobileKeywords.some((keyword) =>
			userAgent.includes(keyword)
		);

		// Additional check for mobile screen size
		const isMobileScreen = window.matchMedia("(max-width: 768px)").matches;

		return isMobileDevice || isMobileScreen;
	}
};

export const getDocurl = (id: string, pageNo: number) =>
	`${baseURL}/ag/file_image/${id}/${pageNo}`;
