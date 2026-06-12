import {Button, Dialog} from "@material-tailwind/react";
import {X} from "lucide-react";
import React, {ChangeEvent, useRef, useState} from "react";
import { FormInput } from "@/components/General/form";
import { FormSelect } from "@/components/General/form/select"; // Select form
import { CalendarBlank } from "@phosphor-icons/react";

interface INoteReminderModalProps {
    open: boolean;
    handleOpen: () => void;
    action?: (info: { dueDate: string; selectedOpt: string }) => void;
    reminderData?: any;
    handleInputChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DueDateNoteModal = ({ open, handleOpen, action, reminderData, handleInputChange }: INoteReminderModalProps) => {

    const startDateRef = useRef<HTMLInputElement>(null);
    const closeDateRef = useRef<HTMLInputElement>(null);
    const [dueDate, setDueDate] = useState("");
    const [selectedOpt, setSelectedOpt] = useState<string | undefined>();

    const handleIconClick = (ref: React.RefObject<HTMLInputElement>) => {
		if (ref.current) {
			ref.current.showPicker();
		}
	};

    const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOpt(e.target.value)
    }

	const handleGenderSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setDueDate(e.target.value);
	};

    return (
        <Dialog
            open={open}
            handler={handleOpen}
            size='md'
            className='p-8 rounded-none bg-white dark:bg-[#232323]'
        >
            <div className="w-full flex flex-row items-center justify-between">
                <h3 className={"text-[20px] font-[600] text-white"}>
                    Create Task
                </h3>
                <X className='cursor-pointer' onClick={handleOpen} />
            </div>
            <div className="flex justify-center items-center w-full flex-col gap-6 pt-6">
                <div className={"flex flex-col gap-5 justify-center items-center w-full"}>
                    <FormInput
                        label={"Date"}
                        type='date'
                        value={selectedOpt}
                        name={"date"}
                        icon={<CalendarBlank />}
                        iconClick={() => handleIconClick(startDateRef)}
                        inputRef={startDateRef}
                        onChange={handleDateInputChange}
                    />
                    <FormSelect
                        label='Select Checklist Type'
                        name='Check Type'
                        value={dueDate}
                        options={["Move in Checklist", "Maintenance Checklist", "Document Upload Checklist"]}
                        onSelect={handleGenderSelect}
                        placeholder='Pick Checklist Type'
                        required
                        error={dueDate === "" ? "Please select a Check Type" : ""}
                    />
                </div>
                <Button
                    variant='outlined'
                    className={`border-pry bg-pry hover:bg-transparent text-white hover:text-pry py-4 px-6 lowercase first-letter:capitalize rounded-none w-full`}
                    onClick={ () => action?.({ dueDate, selectedOpt: selectedOpt || "" }) }
                    // onClick={() => console.log(dueDate, selectedDate)}
                >
                    Create
                </Button>
            </div>

        </Dialog>
    )
}

export default DueDateNoteModal;
