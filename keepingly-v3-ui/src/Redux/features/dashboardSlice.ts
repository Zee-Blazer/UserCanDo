import {
	AgentItemProps,
	AppraiserUserData,
	AuthorisedUserProps,
	CheckListProps,
	DeletedItemsProps,
	DocProps,
	DocumentTypeProps,
	ExpenseListProps,
	InventoryListProps,
	KeeptrackScoreProps,
	OverviewProps,
	PropertyProps,
	RenovationListProps,
} from "@/types";
import { createSlice } from "@reduxjs/toolkit";

export interface DashboardState {
	agents: AgentItemProps[];
	overview: OverviewProps;
	properties: PropertyProps[];
	documentTypes: DocumentTypeProps[];
	expenseTypes: string[];
	activeProperty: PropertyProps | null;
	expenses: ExpenseListProps[];
	documents: DocProps[];
	appraiserDocs: DocProps[];
	renovations: RenovationListProps[];
	appraiserRenovations: RenovationListProps[];
	keeptrackScore: KeeptrackScoreProps;
	checklist: CheckListProps[];
	inventories: InventoryListProps[];
	deletedItems: DeletedItemsProps[];
	appraiserUsers: AppraiserUserData[];
	authorisedUser: AuthorisedUserProps | null;
	notes: any[];
}

const initialState: DashboardState = {
	agents: [],
	overview: {
		total_broker_user: 0,
		total_commission: 0,
		user_id: "",
		expenses_list: [],
		property_count: 0,
		renovations: 0,
		total_invites: 0,
		total_invites_accepeted: 0,
		total_invites_pending: 0,
		weekly_invites: [],
	},
	properties: [],
	documentTypes: [],
	expenseTypes: [],
	activeProperty: null,
	expenses: [],
	documents: [],
	appraiserDocs: [],
	renovations: [],
	checklist: [],
	inventories: [],
	keeptrackScore: {
		score: 0,
		score_increase_from_next_document_checklist: 0,
		score_increase_from_next_maintenance_12_months: 0,
		score_increase_from_next_maintenance_12_months_prior_last_12_months: 0,
		score_increase_from_next_movin_checklist: 0,
	},
	deletedItems: [],
	appraiserUsers: [],
	appraiserRenovations: [],
	authorisedUser: null,
	notes: []
};

const dashboardSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setAgents: (state, { payload }) => {
			state.agents = payload;
		},
		setOverView: (state, { payload }) => {
			state.overview = payload;
		},
		setProperties: (state, { payload }) => {
			state.properties = payload;
		},
		setDocumentTypes: (state, { payload }) => {
			state.documentTypes = payload;
		},
		setExpenseTypes: (state, { payload }) => {
			state.expenseTypes = payload;
		},
		setActiveProperty: (state, { payload }) => {
			state.activeProperty = payload;
		},
		setExpenses: (state, { payload }) => {
			state.expenses = payload;
		},
		setDocuments: (state, { payload }) => {
			state.documents = payload;
		},
		setAppraiserDocs: (state, { payload }) => {
			state.appraiserDocs = payload;
		},
		setRenovations: (state, { payload }) => {
			state.renovations = payload;
		},
		setKeeptrackScore: (state, { payload }) => {
			state.keeptrackScore = payload;
		},
		setChecklist: (state, { payload }) => {
			state.checklist = payload;
		},
		setInventory: (state, { payload }) => {
			state.inventories = payload;
		},
		resetKeepTrack: (state) => {
			state.keeptrackScore = initialState.keeptrackScore;
		},
		setDeletedItems: (state, { payload }) => {
			state.deletedItems = payload;
		},
		setAppraiserUsers: (state, { payload }) => {
			state.appraiserUsers = payload;
		},
		setAppraiserRenovations: (state, { payload }) => {
			state.appraiserRenovations = payload;
		},
		setAuthorisedUser: (state, { payload }) => {
			state.authorisedUser = payload;
		},
		setNotesData: (state, action) => {
			state.notes = action.payload;
		},
		updateNoteData: (state, action) => {
			state.notes = [ ...state.notes, ...action.payload ];
			console.log([ ...state.notes, ...action.payload ]);
		}
	},
});

export const {
	setAgents,
	setOverView,
	setProperties,
	setDocumentTypes,
	setExpenseTypes,
	setActiveProperty,
	setExpenses,
	setDocuments,
	setRenovations,
	setChecklist,
	setKeeptrackScore,
	resetKeepTrack,
	setInventory,
	setDeletedItems,
	setAppraiserDocs,
	setAppraiserUsers,
	setAppraiserRenovations,
	setAuthorisedUser,
	setNotesData,
} = dashboardSlice.actions;
export default dashboardSlice.reducer;
