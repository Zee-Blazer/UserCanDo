"use client";

import React from 'react';

// MUI SnackBar
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

interface Props {
    open: boolean
}

const DisplaySaveStatus = () => {

    return (
        <div>
            <Snackbar
                // open={open}
                autoHideDuration={6000}
                // onClose={handleClose}
                message="Saving..."
                // action={action}
            />
        </div>
    )
}

export default DisplaySaveStatus;
