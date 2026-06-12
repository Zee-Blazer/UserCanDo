"use client";

import { Money } from "@phosphor-icons/react";
import React, { ChangeEvent, useState, useEffect } from "react";
import { useAppContext } from "@/app/context";
import { NoteListProps } from "@/types";
import ListCard from "@/components/Dashboard/overview/listCard";
import {
	Button,
	Popover,
	PopoverContent,
	PopoverHandler,
} from "@material-tailwind/react";
import TanTable from "@/components/General/TanTable";
import Loading from "@/components/General/loading";
import EditNoteModal from "@/components/Dashboard/notes/editNoteModal";
import CreateNoteDrawer from "@/components/Dashboard/notes/create-note-drawer";
import { DeleteIcon, DetailsIcon, ThreeDots, TimeIcon } from "@/assets/icons";
import DeleteNoteModal from "@/components/Dashboard/notes/delete-note-modal";
import NoteReminderModal from "@/components/Dashboard/notes/note-reminder-modal";
import { useDashboardSelector } from "@/Redux/selectors";
import {Snackbar, SnackbarContent} from "@mui/material";

// Due Time Data Modal
import DueDateNoteModal from "@/components/Dashboard/notes/due-date-note-modal";


function formatDate(dateString: string) {
	const date = new Date(dateString);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	let hours = date.getHours();
	const minutes = String(date.getMinutes()).padStart(2, "0");
	const ampm = hours >= 12 ? "PM" : "AM";
	hours = hours % 12 || 12;

	const time = `${String(hours).padStart(2, "0")}:${minutes}${ampm}`;
	return `${year}/${month}/${day}   ${time}`;
}

const Notes = () => {
	// You will later make this a functional loading variable
	const loading = false;
	// Make this to use api hook later
	const isUpdating = false;

	// I'm going to fetch the note from this place
	const {
		isDeleted,
		isDeleting,
		handleDelete,
		createNoteData,
		deleteSpecificNoteEndpoint,
		updateSpecificNoteEndpoint,
		getNoteData,
		createReminderForNoteEndpoint,
		createCheckListNoteEndpoint,
	} = useAppContext();
	const { notes } = useDashboardSelector();

	const [createNoteDrawerOpen, setCreateNoteDrawerOpen] = useState(false);

	const [editingNote, setEditingNote] = useState<NoteListProps | null>(null);

	// Error Message
	const [errMsg, setErrMsg] = useState<string>("");

	const [editForm, setEditForm] = useState({
		note: "",
		date: "",
	});

	// Note related stuffs
	const [currentEditingNoteId, setCurrentEditingNoteId] = useState<string>("");
	const [currentEditingNoteContent, setCurrentEditingNoteContent] =
		useState<string>("");
	// For the title storage
	const [noteTitle, setNoteTitle] = useState<string>("");

	// For task creation
	const [allTasks, setAllTasks] = useState<string[]>();
	const [dueDate, setDueDate] = useState({
		dueDate: "",
		selectedOpt: ""
	});

	const [saveStatus, setSaveStatus] = useState<boolean>(false); // Note storage status

	const handleEdit = (note: NoteListProps) => {
		setEditingNote(note);
		setEditForm({
			note: note.note,
			date: note.date,
		});
	};

	const handleUpdateNote = async () => {
		// You will handle the updating of the note here

		console.log("Note is being updated");
	};

	const handleSaveNote = async (note: string) => {
		setSaveStatus(true);
		try {
			// If there is a currentEditingNoteId save the note and if there isn't just update the note
			if (!currentItemId) { // Check if there is currently no note loaded in
				if (note.length > 0 && noteTitle.length > 0) {

					const response: any = await createNoteData({ noteTitle, note }); // Create a new note and save the response
					if(response) {
						setCurrentItemId(response); // Use response to create id. so the note can continue updating
					}

				  } else {
					setErrMsg("No field can be left empty"); // Set error message if field is not added
				  }
				  setSaveStatus(false); // Save State to false
			} else { // Method to act when the function is editing note
				setSaveStatus(true);
				if (note.length > 1 && noteTitle.length > 1) {
					const response: any = await updateSpecificNoteEndpoint({
						note_id: currentItemId,
						note,
						title: noteTitle,
					});
				
					if (response) {
						getNoteData();
					}
				} else {
					setErrMsg("No field can be left empty");
				}
			
				setSaveStatus(false);
			}
		} catch (err) {
			setSaveStatus(false);
		}
	};

	const openDueDateFunc = (data: string[]) => {
		setAllTasks(data);
		setDueDateModalOpen(true);
	}

	const handleCreateTask = async (info: { dueDate: string; selectedOpt: string }) => {
		setDueDate(info);
		// console.log(info, dueDate);
		if(allTasks && allTasks?.length > 0 && dueDate.dueDate !== "" && dueDate.selectedOpt !== "") {
			const check_type = dueDate.dueDate.toLowerCase().replace(/\s+/g, "_");
			const format = allTasks.map(item => `• ${item}`).join('\n')
			// console.log(format, dueDate);
			try{
				await createCheckListNoteEndpoint({ note: format, check_type, due_date: dueDate.selectedOpt, title: noteTitle })
				setAllTasks([]); setDueDate({ dueDate: "", selectedOpt: "" });

				setDueDateModalOpen(false);
				setCreateNoteDrawerOpen(false);
			} catch(err) {
				console.log("an unexpected error occured!");
			}
		}
	}

	const { isDarkMode } = useAppContext();

	// Current Item id
	const [currentItemId, setCurrentItemId] = useState<string | null>();

	// delete related stuffs
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [reminderModalOpen, setReminderModalOpen] = useState(false);
	const [dueDateModalOpen, setDueDateModalOpen] = useState(false);
	const [reminderData, setReminderData] = useState<any>({
		date: "",
		time: "",
	});

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setReminderData({
			...reminderData,
			[e.target.name]: e.target.value,
		});
	};

	const handleDeleteNote = async () => {
		// Handle the deleting of the note here
		if (currentItemId) {
			await deleteSpecificNoteEndpoint(currentItemId);
			setDeleteModalOpen(!deleteModalOpen);
			getNoteData();
		}
	};

	const handleSetReminder = async () => {
		// Handle the setting of reminder here
		if (currentItemId) {
			await createReminderForNoteEndpoint({
				currentItemId,
				date: reminderData.date,
			});
			setReminderData({ date: "", time: "" })
			setReminderModalOpen(false);
		}
	};

	useEffect( () => {
		if(errMsg) {
			setSaveStatus(true)
			const timer = setTimeout(() => {
				setErrMsg("");
				setSaveStatus(false);
			  }, 5000); // 10 seconds
		
			  return () => clearTimeout(timer);
		}
	}, [errMsg] );

	const columns = [
		{
			header: "S/N",
			cell: (item: any) => <span>{item.row.index + 1}</span>,
			size: 60, // fixed width
		},
		{
			header: "Title",
			accessorKey: "title",
			size: "auto",
		},
		{
			header: "All Notes",
			cell: (item: any) => (
				<div
					className='whitespace-normal break-words line-clamp-2 hover:line-clamp-none'
					dangerouslySetInnerHTML={{ __html: item.row.original.note }}
				/>
			),
			className: "w-full", // This will make it take all available space
			size: "auto", // This tells the table this column should expand
		},
		{
			header: "Date",
			accessorKey: "updated_at",
			cell: (info: any) => formatDate(info.getValue()),
			size: 150, // fixed width
		},
		{
			header: "Action",
			cell: ({ row }: any) => (
				<Popover>
					<PopoverHandler>
						<button className={"w-full flex justify-center items-center"}>
							<ThreeDots />
						</button>
					</PopoverHandler>
					<PopoverContent className='dark:bg-[#1F1F1F] bg-[#EBE0E4] border-none flex flex-col gap-4'>
						<button
							className={"flex flex-row items-center gap-2"}
							onClick={() => {
								console.log(
									"the note to view details content is: ",
									row.original.note
								);
								setCurrentEditingNoteContent(`${row.original.note}`);
								setNoteTitle(row.original.title);
								setCurrentEditingNoteId(row.original.id);
								setCurrentItemId(row.original.id);
								setCreateNoteDrawerOpen(true);
							}}
						>
							<DetailsIcon
								className={"h-[18px] w-[18px]"}
								color={isDarkMode ? "white" : "black"}
							/>
							<span className={"text-[14px] dark:text-white text-black"}>
								View/Edit
							</span>
						</button>
						<button
							className={"flex flex-row items-center gap-2"}
							onClick={() => {
								setReminderModalOpen(true);
								setCurrentItemId(row.original.id);
							}}
						>
							<TimeIcon
								className={"h-[18px] w-[18px]"}
								color={isDarkMode ? "white" : "black"}
							/>
							<span className={"text-[14px] dark:text-white text-black"}>
								Set Reminder
							</span>
						</button>
						<button
							className={"flex flex-row items-center gap-2"}
							onClick={() => {
								setCurrentItemId(row.original.id);
								setDeleteModalOpen(true);
							}}
						>
							<DeleteIcon
								className={"h-[18px] w-[18px]"}
								color={isDarkMode ? "white" : "black"}
							/>
							<span className={"text-[14px] dark:text-white text-black"}>
								Delete
							</span>
						</button>
					</PopoverContent>
				</Popover>
			),
			// cell: ({row}: any) => (
			//     <span className='flex items-center justify-center gap-2'>
			//     <Trash
			//         onClick={() => handleDelete(row.original.id)}
			//         color={colors.pry}
			//         size={20}
			//         className='cursor-pointer'
			//     />
			//     <Pencil
			//         size={18}
			//         className='dark:text-gray_4 text-gray_5 cursor-pointer hover:text-pry'
			//         onClick={() => handleEdit(row.original)}
			//     />
			// </span>
			// ),
			id: "notes",
			size: 40, // fixed width
		},
	];

	return (
		<div>
			<ListCard
				title='Notes'
				icon={<Money size={20} />}
				list={notes || []}
				loadingState={loading}
				emptyStateText='No note added yet'
				headerRight={
					<Button
						variant='outlined'
						className={`border-pry left-0 bg-pry hover:bg-transparent text-white py-4 px-6 lowercase first-letter:capitalize`}
						onClick={() => {
							setCreateNoteDrawerOpen(true);
							setCurrentItemId(null);
						}}
					>
						New Note
					</Button>
				}
			>
				<TanTable
					showSearch
					data={notes || []}
					columnData={columns}
					length={5}
					// filterList={["All"]}
					hideFilter
					propertySearch
				/>
				<Loading isLoading={isDeleting} />
			</ListCard>

			<EditNoteModal
				isOpen={!!editingNote}
				onClose={() => setEditingNote(null)}
				note={editingNote}
				onUpdate={handleUpdateNote}
				editForm={editForm}
				setEditForm={setEditForm}
				loading={isUpdating}
			/>
			<CreateNoteDrawer
				key={createNoteDrawerOpen ? currentEditingNoteId || "new" : "closed"}
				onClose={() => {
					setCreateNoteDrawerOpen(false);
					setCurrentEditingNoteContent("");
					setNoteTitle("");
					setCurrentEditingNoteId("");
				}}
				open={createNoteDrawerOpen}
				onSave={handleSaveNote}
				deleteNote={ () => {
					// setCreateNoteDrawerOpen(false)
					setDeleteModalOpen(true)
				} }
				openDueDate={ openDueDateFunc }
				setReminder={ () => {
					// setCreateNoteDrawerOpen(false)
					setReminderModalOpen(true)
				} }
				// saveStatus={ (val: boolean) => { setSaveStatus(val) } }
				initialContent={currentEditingNoteContent}
				noteTitle={noteTitle}
				setNoteTitle={(title: string) => setNoteTitle(title)}
			/>
			<DeleteNoteModal
				open={deleteModalOpen}
				handleOpen={() => setDeleteModalOpen(!deleteModalOpen)}
				action={handleDeleteNote}
			/>
			<NoteReminderModal
				open={reminderModalOpen}
				handleOpen={() => setReminderModalOpen(!reminderModalOpen)}
				action={handleSetReminder}
				reminderData={reminderData}
				handleInputChange={handleInputChange}
			/>

			<DueDateNoteModal 
				open={ dueDateModalOpen }
				handleOpen={ () => setDueDateModalOpen(!dueDateModalOpen) }
				action={ handleCreateTask }
			/>

			<Snackbar
			open={saveStatus}
			autoHideDuration={6000}
			>
				<SnackbarContent
					message={errMsg ? errMsg : 'Saving note...'}
					sx={{
					color: errMsg ? 'red' : 'green',
					bgcolor: 'background.paper',
					}}
				/>
			</Snackbar>
		</div>
	);
};

export default Notes;
