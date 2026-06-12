"use client";

import { Box, Modal } from '@mui/material';
import React from "react";

interface GeneralModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
    className?: string;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '99vw', sm: 480, md: 540 },
    maxWidth: '99vw',
    bgcolor: 'background.paper',
    borderRadius: '16px',
    boxShadow: 24,
    p: { xs: 2, sm: 3 },
    outline: 'none',
};

const GeneralModal: React.FC<GeneralModalProps> = ({ open, onClose, title, children, className }) => {
    if (!open) return null;

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="general-modal-title"
            aria-describedby="general-modal-description"
        >
            <Box sx={style} className={className ?? ""}>
                <div id="general-modal-description">
                    {children}
                </div>
            </Box>
        </Modal>
    );
};

export default GeneralModal;