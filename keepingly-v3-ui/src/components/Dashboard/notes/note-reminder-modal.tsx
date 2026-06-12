import {Button, Dialog} from "@material-tailwind/react";
import {X} from "lucide-react";
import React, {ChangeEvent, useRef} from "react";
import {FormInput} from "@/components/General/form";
import { CalendarBlank } from "@phosphor-icons/react";

interface INoteReminderModalProps {
    open: boolean;
    handleOpen: () => void;
    action: () => void;
    reminderData: any;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const NoteReminderModal = ({ open, handleOpen, action, reminderData, handleInputChange }: INoteReminderModalProps) => {

    const startDateRef = useRef<HTMLInputElement>(null);
    const closeDateRef = useRef<HTMLInputElement>(null);

    const handleIconClick = (ref: React.RefObject<HTMLInputElement>) => {
		if (ref.current) {
			ref.current.showPicker();
		}
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
                    Set Reminder
                </h3>
                <X className='cursor-pointer' onClick={handleOpen} />
            </div>
            <div className="flex justify-center items-center w-full flex-col gap-6 pt-6">
                <div className={"flex flex-col gap-5 justify-center items-center w-full"}>
                    <FormInput
                        label={"Date"}
                        type='date'
                        value={reminderData.date}
                        name={"date"}
                        icon={<CalendarBlank />}
                        iconClick={() => handleIconClick(startDateRef)}
                        inputRef={startDateRef}
                        onChange={handleInputChange}
                    />
                    <FormInput
                        label={"Time"}
                        type={"time"}
                        value={reminderData.time}
                        name={"time"}
                        onChange={handleInputChange}
                    />
                </div>
                <Button
                    variant='outlined'
                    className={`border-pry bg-pry hover:bg-transparent text-white hover:text-pry py-4 px-6 lowercase first-letter:capitalize rounded-none w-full`}
                    onClick={action}
                >
                    Set a reminder
                </Button>
            </div>

        </Dialog>
    )
}

export default NoteReminderModal;