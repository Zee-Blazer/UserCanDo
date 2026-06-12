import {
	AppointmentActiveIcon,
	AppointmentIcon,
	AppraiserActiveIcon,
	BrokerIcon,
	BrokersIcon,
	BrokersIconActive,
	DocumentActiveIcon,
	DocumentIcon,
	ExpenseActiveIcon,
	ExpenseIcon,
	InventoryActiveIcon,
	InventoryIcon, NoteActiveIcon, NoteIcon,
	OverviewIcon,
	OverviewIconActive,
	PropertyIcon,
	PropertyIconActive,
	RenovationActiveIcon,
	RenovationIcon,
	SettingIcon,
	SettingIconActive,
	UserICon,
} from "@/assets/icons";
import {
	Building,
	FolderSimpleUser,
	ShieldCheckered,
	Wallet,
} from "@phosphor-icons/react";
import { ShieldCheck } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import Notes from "@/app/(pages)/notes";

export const USAstates = [
	"Alabama",
	"Alaska",
	"Arizona",
	"Arkansas",
	"California",
	"Colorado",
	"Connecticut",
	"Delaware",
	"Florida",
	"Georgia",
	"Hawaii",
	"Idaho",
	"Illinois",
	"Indiana",
	"Iowa",
	"Kansas",
	"Kentucky",
	"Louisiana",
	"Maine",
	"Maryland",
	"Massachusetts",
	"Michigan",
	"Minnesota",
	"Mississippi",
	"Missouri",
	"Montana",
	"Nebraska",
	"Nevada",
	"New Hampshire",
	"New Jersey",
	"New Mexico",
	"New York",
	"North Carolina",
	"North Dakota",
	"Ohio",
	"Oklahoma",
	"Oregon",
	"Pennsylvania",
	"Rhode Island",
	"South Carolina",
	"South Dakota",
	"Tennessee",
	"Texas",
	"Utah",
	"Vermont",
	"Virginia",
	"Washington",
	"West Virginia",
	"Wisconsin",
	"Wyoming",
];

export const brokerRoles = [
	"Broker admin",
	"Broker super-user",
	"Broker agent",
];

export const authRoles = [
	{
		role: "homeowner",
		icon: <UserICon />,
		title: "I am a homeowner",
		desc: "Manage your property and track maintenance history.",
	},
	{
		role: "broker_admin",
		icon: <BrokerIcon />,
		title: "I am a broker/agent",
		desc: "Manage properties and invite homeowners.",
	},
];

export const brokerNavItems = [
	{
		title: "Overview",
		link: ROUTES.home,
		icon: <OverviewIcon />,
		activeIcon: <OverviewIconActive />,
	},
	{
		title: "Property Info",
		link: ROUTES.properties,
		icon: <PropertyIcon />,
		activeIcon: <PropertyIconActive />,
	},
	{
		title: "Agents",
		link: ROUTES.agents,
		icon: <BrokersIcon />,
		activeIcon: <BrokersIconActive />,
	},
	{
		title: "Settings",
		link: ROUTES.settings,
		icon: <SettingIcon />,
		activeIcon: <SettingIconActive />,
	},
];
export const homeOwnerNavItems = [
	{
		title: "Overview",
		link: ROUTES.overview,
		icon: <OverviewIcon />,
		activeIcon: <OverviewIconActive />,
	},
	{
		title: "Property Info",
		link: ROUTES.properties,
		icon: <PropertyIcon />,
		activeIcon: <PropertyIconActive />,
	},
	{
		title: "Expenses",
		link: ROUTES.expenses,
		icon: <ExpenseIcon />,
		activeIcon: <ExpenseActiveIcon />,
	},
	{
		title: "Renovations",
		link: ROUTES.renovations,
		icon: <RenovationIcon />,
		activeIcon: <RenovationActiveIcon />,
	},
	{
		title: "Docs, Photos  & Videos",
		link: ROUTES.documents,
		icon: <DocumentIcon />,
		activeIcon: <DocumentActiveIcon />,
	},
	{
		title: "Appraisals Edge",
		link: ROUTES.appraiserEdge,
		icon: <FolderSimpleUser size={20} />,
		activeIcon: <FolderSimpleUser weight='fill' size={20} />,
	},
	{
		title: "Insurable Inventory",
		link: ROUTES.inventory,
		icon: <InventoryIcon />,
		activeIcon: <InventoryActiveIcon />,
	},
	// {
	// 	title: "Appointments",
	// 	link: ROUTES.appointments,
	// 	icon: <AppointmentIcon />,
	// 	activeIcon: <AppointmentActiveIcon />,
	// },
	// {
	// 	title: "Appointments",
	// 	link: ROUTES.appointments,
	// 	icon: <AppointmentIcon />,
	// 	activeIcon: <AppointmentActiveIcon />,
	// },
	{
		title: "Notes",
		link: ROUTES.notes,
		icon: <NoteIcon />,
		activeIcon: <NoteActiveIcon />,
	},
];
export const appraiserNavItems = [
	{
		title: "Appraiser's Edge",
		link: ROUTES.home,
		icon: <FolderSimpleUser size={20} />,
		activeIcon: <FolderSimpleUser weight='fill' size={20} />,
	},
];

export const termsArr = [
	{
		icon: <ShieldCheck size={28} />,
		text: "FDIC insurance",
	},
	{
		icon: <Building size={28} />,
		text: "Regulated partners",
	},
	{
		icon: <ShieldCheckered size={28} />,
		text: "SOC-2 compliance",
	},
	{
		icon: <ShieldCheckered size={28} />,
		text: "Proactive protection",
	},
];

export const inventoryData = [
	{
		purchase_name: "Laptop",
		description: "High-performance laptop",
		purchase_date: "2024-08-01",
		purchase_price: 1500.0,
		quantity: 10,
	},
	{
		purchase_name: "Monitor",
		description: "27-inch 4K UHD monitor",
		purchase_date: "2024-08-10",
		purchase_price: 300.0,
		quantity: 5,
	},
	{
		purchase_name: "Keyboard",
		description: "Mechanical keyboard",
		purchase_date: "2024-08-15",
		purchase_price: 120.0,
		quantity: 15,
	},
	{
		purchase_name: "Mouse",
		description: "Wireless mouse",
		purchase_date: "2024-08-20",
		purchase_price: 50.0,
		quantity: 20,
	},
	{
		purchase_name: "Desk",
		description: "Standing desk",
		purchase_date: "2024-07-25",
		purchase_price: 400.0,
		quantity: 8,
	},
	{
		purchase_name: "Chair",
		description: "Ergonomic office chair",
		purchase_date: "2024-07-30",
		purchase_price: 250.0,
		quantity: 12,
	},
	{
		purchase_name: "Headphones",
		description: "Noise-cancelling headphones",
		purchase_date: "2024-08-05",
		purchase_price: 200.0,
		quantity: 7,
	},
	{
		purchase_name: "Printer",
		description: "Wireless color printer",
		purchase_date: "2024-08-12",
		purchase_price: 180.0,
		quantity: 3,
	},
	{
		purchase_name: "Webcam",
		description: "1080p HD webcam",
		purchase_date: "2024-08-18",
		purchase_price: 75.0,
		quantity: 10,
	},
	{
		purchase_name: "Router",
		description: "Wi-Fi 6 router",
		purchase_date: "2024-08-25",
		purchase_price: 150.0,
		quantity: 6,
	},
];

export const renovationOptions = [
	"Kitchen",
	"Bathroom",
	"Living Room",
	"Bedroom",
	"Basement",
	"Attic",
	"Exterior",
	"Garden/Yard",
	"Garage",
	"Home Office",
	"Laundry/Utility Room",
	"Hallways & Stairs",
	"Dining Room",
	"Closets & Storage",
	"Other",
];

export const appraiserMockData = [
	{
		appraiser_name: "John Doe",
		appraiser_email: "john.doe@example.com",
		opened: true,
	},
	{
		appraiser_name: "Jane Smith",
		appraiser_email: "jane.smith@example.com",
		opened: false,
	},
	{
		appraiser_name: "Alice Johnson",
		appraiser_email: "alice.johnson@example.com",
		opened: true,
	},
	{
		appraiser_name: "Bob Brown",
		appraiser_email: "bob.brown@example.com",
		opened: false,
	},
	{
		appraiser_name: "Charlie Davis",
		appraiser_email: "charlie.davis@example.com",
		opened: true,
	},
	{
		appraiser_name: "Emma Wilson",
		appraiser_email: "emma.wilson@example.com",
		opened: false,
	},
	{
		appraiser_name: "Daniel Taylor",
		appraiser_email: "daniel.taylor@example.com",
		opened: true,
	},
	{
		appraiser_name: "Olivia Martinez",
		appraiser_email: "olivia.martinez@example.com",
		opened: false,
	},
	{
		appraiser_name: "Lucas Anderson",
		appraiser_email: "lucas.anderson@example.com",
		opened: true,
	},
	{
		appraiser_name: "Sophia Thomas",
		appraiser_email: "sophia.thomas@example.com",
		opened: false,
	},
];
