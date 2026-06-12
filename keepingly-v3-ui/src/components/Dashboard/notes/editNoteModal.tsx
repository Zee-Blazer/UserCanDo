import React from "react";
import {
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Button,
} from "@material-tailwind/react";
import { FormInput } from "@/components/General/form";
import CurrencyInput from "@/components/General/form/currencyInput";
import {ExpenseListProps, NoteListProps} from "@/types";
import { FormSelect } from "@/components/General/form/select";
import { useDashboardSelector } from "@/Redux/selectors";

interface EditNoteModalProps {
    isOpen: boolean;
    onClose: () => void;
    note: NoteListProps | null;
    onUpdate: () => void;
    loading: boolean;
    editForm: {
        note: string;
        date: string;
    };
    setEditForm: React.Dispatch<
        React.SetStateAction<{
            note: string;
            date: string;
        }>
    >;
}

const EditNoteModal = ({
                               isOpen,
                               onClose,
                               note,
                               onUpdate,
                               editForm,
                               setEditForm,
                               loading,
                           }: EditNoteModalProps) => {
    return (
        <Dialog
            open={isOpen}
            handler={onClose}
            size='sm'
            className='bg-white dark:bg-black'
        >
            <DialogHeader className='text-gray_5 dark:text-gray_3'>
                Edit Note
            </DialogHeader>
            <DialogBody>
                <div className='flex flex-col gap-4 text-gray_5 dark:text-gray_3'>
                {/*  The forms are supposed to be here  */}
                    I will add the edit here later.
                </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant='text'
                    onClick={onClose}
                    className='mr-1 dark:text-gray_3 text-gray_5 normal-case'
                >
                    Cancel
                </Button>
                <Button
                    onClick={onUpdate}
                    loading={loading}
                    className='bg-pry normal-case'
                >
                    Update
                </Button>
            </DialogFooter>
        </Dialog>
    );
};

export default EditNoteModal;
