"use client";
import useApiRequest from "@/api/hooks/useApiRequest";
import usePostRequest from "@/api/hooks/usePost";
import { login, logUserOut, setProfileUser } from "@/Redux/features/authSlice";
import {
	resetKeepTrack,
	setActiveProperty,
	setAgents,
	setAppraiserDocs,
	setAppraiserRenovations,
	setAppraiserUsers,
	setAuthorisedUser,
	setChecklist,
	setDeletedItems,
	setDocuments,
	setDocumentTypes,
	setExpenses,
	setExpenseTypes,
	setInventory,
	setKeeptrackScore,
	setNotesData,
	setOverView,
	setProperties,
	setRenovations,
} from "@/Redux/features/dashboardSlice";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { CheklistQueryProps } from "@/types";
import { platform as tauriPlatform } from "@tauri-apps/plugin-os";

import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from "react";
import { useDispatch } from "react-redux";

interface AppContextType {
	getBrokers: () => void;
	toggleTheme: () => void;
	getProperties: () => void;
	getExpenses: (filterType?: string) => void;
	getDocuments: () => void;
	getRenovations: (filterType?: string) => void;
	loadOverView: () => void;
	getInventory: (filterType?: string) => void;
	uploadDocument: (payload: any) => void;
	getChecklists: ({}) => void;
	getUser: () => void;
	getBin: () => void;
	handleDelete: (id: string) => void;
	isDarkMode: boolean;
	isUplaoding: boolean;
	isDocUploaded: boolean;
	isMobile: boolean;
	isHomeownerOverviewdFetching: boolean;
	isChecklistFetching: boolean;
	isExpensesFetching: boolean;
	isDocumentFetching: boolean;
	isDeleting: boolean;
	isDeleted: boolean;
	isBinFetching: boolean;
	isRenovationsFetching: boolean;
	isAppraiserDocsFetching: boolean;
	isAppraiserUserFetching: boolean;
	getAppraiserDocuments: () => void;
	getAppraisalUsers: (filterType?: string) => void;
	getAppraisalRenovations: () => void;
	resetDeleteState: () => void;
	getAuthorisedUser: () => void;
	getNoteData: () => void;
	createNoteData: (e: any) => void;
	deleteSpecificNoteEndpoint: (e: any) => void;
	updateSpecificNoteEndpoint: (e: any) => void;
	createReminderForNoteEndpoint: (e: any) => void;
	createCheckListNoteEndpoint: (e: any) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider = ({ children }: PropsWithChildren) => {
	const dispatch = useDispatch();
	const { user } = useAuthSelector();
	const { activeProperty, properties } = useDashboardSelector();
	const [isMobile, setIsMobile] = useState(false);
	const [fetchCount, setFetchCount] = useState(0);

	const checkPlatform = async () => {
		try {
			const plat = await tauriPlatform();
			setIsMobile(plat === "ios" || plat === "android");
		} catch {
			setIsMobile(false);
		}
	};

	useEffect(() => {
		checkPlatform();
	}, []);

	const [isDarkMode, setIsDarkMode] = useState(() => {
		return (
			localStorage.getItem("theme") === "dark" ||
			(!localStorage.getItem("theme") &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		);
	});

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
	};

	useEffect(() => {
		const rootElement = document.documentElement;
		rootElement.style.transition = "background-color 0.3s, color 0.3s";

		if (isDarkMode) {
			rootElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			rootElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDarkMode]);

	// Using useApiRequest for all API requests with their loading states
	const { getRequest: getBrokerRequest } = useApiRequest();
	const { getRequest: getOverviewRequest } = useApiRequest();
	const { getRequest: getPropertiesRequest } = useApiRequest();
	const { getRequest: getTokenRequest } = useApiRequest();
	const { getRequest: getDocTypesRequest } = useApiRequest();
	const { getRequest: getExpenseTypesRequest } = useApiRequest();
	const { getRequest: getExpensesRequest, loading: isExpensesFetching } =
		useApiRequest();
	const { 
		getRequest: getNoteRequest, 
		loading: isLoadingNote, 
		postRequest: createNoteRequest,
		postRequest: deleteSpecificNote,
		postRequest: updateSpecificNote,
		postRequest: createReminderForNote,
		postRequest: createCheckListNote
	} = useApiRequest(); // Notes
	const { getRequest: getBinRequest, loading: isBinFetching } = useApiRequest();
	const { getRequest: getDocumentsRequest, loading: isDocumentFetching } =
		useApiRequest();
	const {
		getRequest: getAppraiserDocsRequest,
		loading: isAppraiserDocsFetching,
	} = useApiRequest();
	const { getRequest: getAppraiserUserDocsRequest } = useApiRequest();
	const { getRequest: getRenovationsRequest, loading: isRenovationsFetching } =
		useApiRequest();
	const {
		getRequest: getHomeownerOverviewRequest,
		loading: isHomeownerOverviewdFetching,
	} = useApiRequest();
	const { getRequest: getChecklistRequest, loading: isChecklistFetching } =
		useApiRequest();
	const { getRequest: getInventoryRequest } = useApiRequest();
	const { getRequest: getUserRequest } = useApiRequest();
	const { getRequest: getAuthorisedUserRequest } = useApiRequest();
	const {
		getRequest: getAppraiserUserRequest,
		loading: isAppraiserUserFetching,
	} = useApiRequest();
	const { getRequest: getAppraiserRenovationsRequest } = useApiRequest();
	const { getRequest: getAppraiserUserRenovationsRequest } = useApiRequest();

	const {
		postRequest: uploadDoc,
		loading: isUplaoding,
		isSuccess: isDocUploaded,
	} = usePostRequest();

	const {
		isSuccess: isDeleted,
		loading: isDeleting,
		postRequest: deletePropertyReq,
		reset: resetDeleteState,
	} = usePostRequest();

	const handleDelete = async (id: string) =>
		await deletePropertyReq("/delete_item", { id });

	const uploadDocument = async (payload: any) => {
		const formData = new FormData();

		for (const key in payload) {
			formData.append(key, payload[key]);
		}
		await uploadDoc("/add_document", formData);
	};

	// Refactored API request functions with callbacks
	const getBrokers = () => {
		getBrokerRequest("/get_all_broker_user", (data, isSuccess) => {
			if (isSuccess) {
				dispatch(setAgents(data?.payload));
			} else {
				dispatch(setAgents([]));
			}
		});
	};

	// Get Note
	const getNoteData = async () => {
		await getNoteRequest(`/get_notes?property_id=${activeProperty?.id}`, (data, isSuccess) => {
			if(isSuccess) {
				dispatch(setNotesData(data?.payload))
			}
		})
	}

	// Create Note Endpoint
	const createNoteData = async (note: { noteTitle: string, note: string }) => {
		let returnData: any;
		await createNoteRequest(
			`/create_note`, 
			{ property_id: activeProperty?.id, title: note.noteTitle, note: note.note },
			( data, isSuccess ) => {
				if(isSuccess) {
					getNoteData();
					console.log(data.payload.id);
					returnData = data.payload.id;
				}
			},
			false
		)

		return returnData;
	}

	// Delete a specific Note Endpoint
	const deleteSpecificNoteEndpoint = async (note_id: string) => {
		await deleteSpecificNote(
			`/delete_note`,
			{ note_id },
			( data, isSuccess ) => { 
				if(isSuccess) {
					getNoteData();
					console.log("Record was deleted sucessfully")
				}
			}
		)
	}

	// Update a specific Note Endpoint
	const updateSpecificNoteEndpoint = async (data: {note_id: string, note: string, title: string}) => {
		updateSpecificNote(
			`/update_note`,
			{ note_id: data.note_id, note: data.note, title: data.title },
			( data, isSuccess ) => {
				if(isSuccess) getNoteData();
			},
			false
		)
	}

	// Create Reminder for Note
	const createReminderForNoteEndpoint = async (data: {currentItemId: string, date: string}) => {
		// console.log("Setting reminder")
		createReminderForNote(
			`/set_reminder?property_id=${activeProperty?.id}`,
			{ note_id: data.currentItemId, reminder_date: data.date }
		)
	}

	// Create Checklist
	const createCheckListNoteEndpoint = async (data: { note: string[], type: string, date: string, title: string }) => {
		await createCheckListNote(
			"/convert_note_to_checklist",
			{ property: activeProperty?.id, ...data },
			( data, isSuccess ) => { 
				if(isSuccess) {
					getNoteData();
				}
			}
		)
		// console.log(data);
	}

	const getAppraisalUsers = (filterType?: string) => {
		getAppraiserUserRequest(
			`/appraisers?filter_type=${filterType}`,
			(data, isSuccess) => {
				if (isSuccess) {
					dispatch(setAppraiserUsers(data?.payload?.result_payload));
				} else {
					dispatch(setAppraiserUsers(null));
				}
			}
		);
	};

	const getAppraisalRenovations = () => {
		getAppraiserRenovationsRequest(
			`/appraisers_renovation?property_id=${activeProperty?.id}`,
			(data, isSuccess) => {
				if (isSuccess) {
					dispatch(setAppraiserRenovations(data?.payload));
				} else {
					dispatch(setAppraiserRenovations([]));
				}
			}
		);
	};

	const getUser = () => {
		getUserRequest("/get_current_user", (data, isSuccess) => {
			if (isSuccess) {
				dispatch(setProfileUser(data?.payload));
			} else {
				dispatch(setProfileUser(null));
			}
		});
	};

	const getAuthorisedUser = () => {
		getAuthorisedUserRequest("/get_all_authorized_user", (data, isSuccess) => {
			if (isSuccess) {
				console.log(data?.payload);
				dispatch(setAuthorisedUser(data?.payload));
			} else {
				dispatch(setAuthorisedUser(null));
			}
		});
	};

	const getAllDocumentTypes = () => {
		getDocTypesRequest("/document_category_list", (data, isSuccess) => {
			if (isSuccess) {
				const structuredArray = Object.entries(data?.payload?.category_map).map(
					([category, subCategories]: any) => ({
						category,
						sub_categories: subCategories.sub_categories,
					})
				);
				dispatch(setDocumentTypes(structuredArray));
			} else {
				dispatch(setDocumentTypes([]));
			}
		});
	};

	const getExpenseTypes = () => {
		getExpenseTypesRequest("/get_all_expenses_list", (data, isSuccess) => {
			if (isSuccess) {
				const list = Object.keys(data?.payload?.expense_category_map);
				dispatch(setExpenseTypes(list));
			} else {
				dispatch(setExpenseTypes([]));
			}
		});
	};

	const getExpenses = (filterType?: string) => {
		getExpensesRequest(
			`/get_all_expenses?property_id=${activeProperty?.id}&filter_type=${filterType}`,
			(data, isSuccess) => {
				if (isSuccess) {
					dispatch(setExpenses(data?.payload));
				} else {
					dispatch(setExpenses([]));
				}
			}
		);
	};

	const getDocuments = () => {
		getDocumentsRequest(
			`/get_all_documents?property_id=${activeProperty?.id}`,
			(data, isSuccess) => {
				if (isSuccess) {
					dispatch(setDocuments(data?.payload));
				} else {
					dispatch(setDocuments([]));
				}
			}
		);
	};

	const getAppraiserDocuments = () => {
		getAppraiserDocsRequest(
			`/appraisers_document?property_id=${activeProperty?.id ?? ""}`,
			(data, isSuccess) => {
				if (isSuccess) {
					dispatch(setAppraiserDocs(data?.payload));
				} else {
					dispatch(setAppraiserDocs([]));
				}
			}
		);
	};

	const getAppraiserUserDocuments = () => {
		getAppraiserUserDocsRequest(
			`/appraisers_document_user`,
			(data, isSuccess) => {
				if (isSuccess) {
					dispatch(setAppraiserDocs(data?.payload));
				} else {
					dispatch(setAppraiserDocs([]));
				}
			}
		);
	};

	const getRenovations = (filterType?: string) => {
		getRenovationsRequest(
			`/get_all_renovations?property_id=${
				activeProperty?.id ?? ""
			}&filter_type=${filterType}`,
			(data, isSuccess) => {
				if (isSuccess) {
					dispatch(setRenovations(data?.payload));
				} else {
					dispatch(setRenovations([]));
				}
			}
		);
	};

	const getAppraisalUserRenovations = () => {
		getAppraiserUserRenovationsRequest(
			`/appraisers_renovation_user`,
			(data, isSuccess) => {
				if (isSuccess) {
					dispatch(setAppraiserRenovations(data?.payload));
				} else {
					dispatch(setAppraiserRenovations([]));
				}
			}
		);
	};

	const getHomeownerOverview = () => {
		if (!activeProperty || activeProperty?.id === undefined) {
			return;
		}
		getHomeownerOverviewRequest(
			`/homeowner_dashboard_overview?property_id=${activeProperty?.id}`,
			(data, isSuccess) => {
				if (isSuccess) {
					const overviewData = data?.payload;
					dispatch(setKeeptrackScore(overviewData?.keeptrack_score));
				} else {
					// dispatch(resetKeepTrack());
				}
			}
		);
	};

	const getChecklists = ({
		status = "",
		task_type = "",
	}: CheklistQueryProps) => {
		getChecklistRequest(
			`/get_checklist_tasks?property_id=${activeProperty?.id}&status=${status}&task_type=${task_type}`,
			(data, isSuccess) => {
				if (isSuccess) {
					dispatch(setChecklist(data?.payload));
				} else {
					dispatch(setChecklist([]));
				}
			}
		);
	};

	const getInventory = (filterType?: string) => {
		getInventoryRequest(
			`/get_inventories?property_id=${activeProperty?.id}&filter_type=${filterType}`,
			(data, isSuccess) => {
				if (isSuccess) {
					dispatch(setInventory(data?.payload));
				} else {
					dispatch(setInventory([]));
				}
			}
		);
	};

	const getOverviewDetails = () => {
		getOverviewRequest("/get_overview_details", (data, isSuccess) => {
			if (isSuccess) {
				dispatch(setOverView(data?.payload));
			} else {
				dispatch(setOverView(null));
			}
		});
	};

	const getProperties = () => {
		getPropertiesRequest("/get_all_properties", (data, isSuccess) => {
			if (isSuccess) {
				dispatch(setProperties(data?.payload));
				if (!activeProperty && data?.payload.length > 0) {
					dispatch(setActiveProperty(data?.payload[0]));
				}
			} else {
				dispatch(setProperties([]));
			}
		});
	};

	const getBin = () => {
		getBinRequest(`/bin`, (data, isSuccess) => {
			if (isSuccess) {
				dispatch(setDeletedItems(data?.payload));
			} else {
				dispatch(setDeletedItems(null));
			}
		});
	};

	const getTokenData = () => {
		getTokenRequest(
			`/refreshtoken?refresh_token=${user?.refresh_token}`,
			(tokenData, isSuccess) => {
				if (isSuccess) {
					localStorage.setItem("token", tokenData?.payload.access_token);
					setFetchCount(fetchCount + 1);
					dispatch(login(tokenData?.payload));
					if (user?.role === "homeowner") {
						loadHomeownerData();
						if (properties?.length > 0 && activeProperty) {
							loadHomeownerPropertyDependentData();
						}
					} else if (user?.role?.includes("broker")) {
						loadBrokerData();
					} else if (user?.role === "appraiser") {
						loadAppraiserData();
					}
				} else {
					dispatch(logUserOut());
				}
			},
			false
		);
	};

	const loadBrokerData = () => {
		getOverviewDetails();
		getBrokers();
		getProperties();
		getAllDocumentTypes();
		getUser();
		getBin();
		getAuthorisedUser();
	};

	const loadHomeownerData = () => {
		getProperties();
		getAllDocumentTypes();
		getExpenseTypes();
		getUser();
		getBin();
		getAppraisalUsers();
		getAuthorisedUser();
	};

	const loadAppraiserData = () => {
		getUser();
		getBin();
		getAppraiserUserDocuments();
		getAppraisalUserRenovations();
	};

	const loadHomeownerPropertyDependentData = () => {
		getExpenses();
		getDocuments();
		getRenovations();
		getHomeownerOverview();
		getChecklists({});
		getInventory();
		getAppraiserDocuments();
		getAppraisalUserRenovations();
		getNoteData();
	};

	const loadOverView = () => {
		if (user?.role === "homeowner") {
			getHomeownerOverview();
		} else if (user?.role?.includes("broker")) {
			getOverviewDetails();
		}
	};

	useEffect(() => {
		if (user?.refresh_token) {
			getTokenData();
		}
	}, []);

	useEffect(() => {
		if (
			properties?.length > 0 &&
			activeProperty &&
			user?.role === "homeowner" &&
			user?.access_token &&
			fetchCount > 0
		) {
			loadHomeownerPropertyDependentData();
		} else if (properties?.length < 1 && activeProperty) {
			dispatch(setActiveProperty(null));
		}
	}, [activeProperty, properties, activeProperty?.id, user?.access_token]);

	useEffect(() => {
		if (isDeleted) {
			getBin();
		}
	}, [isDeleted]);

	const value: AppContextType = {
		toggleTheme,
		isDarkMode,
		getBrokers,
		getProperties,
		getExpenses,
		getDocuments,
		getRenovations,
		loadOverView,
		getChecklists,
		getInventory,
		uploadDocument,
		isDocUploaded,
		isUplaoding,
		getUser,
		isMobile,
		getBin,
		isHomeownerOverviewdFetching,
		isChecklistFetching,
		isDocumentFetching,
		isExpensesFetching,
		handleDelete,
		isDeleted,
		isDeleting,
		isBinFetching,
		isRenovationsFetching,
		getAppraiserDocuments,
		isAppraiserDocsFetching,
		getAppraisalUsers,
		isAppraiserUserFetching,
		getAppraisalRenovations,
		resetDeleteState,
		getAuthorisedUser,
		getNoteData,
		createNoteData,
		deleteSpecificNoteEndpoint,
		updateSpecificNoteEndpoint,
		createReminderForNoteEndpoint,
		createCheckListNoteEndpoint
	};

	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
	return useContext(AppContext) as AppContextType;
};

export default AppProvider;
