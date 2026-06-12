import {Button, Dialog} from "@material-tailwind/react";
import {X} from "lucide-react";
import React from "react";

interface IDeleteNoteModalProps {
    open: boolean;
    handleOpen: () => void;
    action: () => void;
}

const DeleteNoteModal = ({ open, handleOpen, action }: IDeleteNoteModalProps) => {
    return (
        <Dialog
            open={open}
            handler={handleOpen}
            size='md'
            className='p-8 rounded-none bg-white dark:bg-[#232323]'
        >
            <div className="w-full flex flex-row items-center justify-end">
                <X className='cursor-pointer' onClick={handleOpen} />
            </div>
            <div className="flex justify-center items-center w-full flex-col gap-6 py-6">
                <div className={"flex flex-col gap-5 justify-center items-center w-full max-w-[420px]"}>
                    <p className={"text-[20px] font-[600] text-black dark:text-white text-center"}>
                        Are you sure you want to delete this note?
                    </p>
                    <p className={"font-[400] text-center text-[#000000A3] dark:text-[#FFFFFFA3]"}>
                        This action cannot be undone. Once deleted, the note will be permanently removed.
                    </p>
                </div>
                <Button
                    variant='outlined'
                    className={`border-pry bg-pry hover:bg-transparent text-white hover:text-pry py-4 px-6 lowercase first-letter:capitalize rounded-none w-full`}
                    onClick={handleOpen}
                >
                    Keep Note
                </Button>
                <Button
                    variant='gradient'
                    className={`border-pry text-pry py-4 px-6 lowercase first-letter:capitalize rounded-none w-full`}
                    onClick={action}
                >
                    Delete Note
                </Button>
            </div>

        </Dialog>
    )
}

export default DeleteNoteModal;