import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface ConfirmDeleteModalProps {
    open: boolean;
    onClose: () => void;
    item: any;
    itemName?: string;
    itemType?: string;
    onDelete: (item: any) => void;
    loading?: boolean;
}

const ConfirmDeleteModal = ({
    open,
    onClose,
    item,
    itemName = 'item',
    itemType = 'Item',
    onDelete,
    loading = false
}: ConfirmDeleteModalProps) => {
    const handleDelete = () => {
        onDelete(item);
        onClose();
    };

    const displayName = item?.full_name || item?.name || item?.title || 'this item';

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle>Delete {itemType}</DialogTitle>
            <DialogContent>
                <p>Are you sure you want to delete <strong>{displayName}</strong>?</p>
                <p className="text-sm text-gray-600 mt-2">This action cannot be undone.</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit" disabled={loading}>
                    Cancel
                </Button>
                <Button
                    onClick={handleDelete}
                    color="error"
                    variant="contained"
                    disabled={loading}
                >
                    {loading ? 'Deleting...' : 'Delete'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDeleteModal;