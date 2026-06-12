import { Box, Button, Checkbox, CircularProgress, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

interface ChecklistModalProps {
    open: boolean;
    onClose: () => void;
    onContinue?: () => void;
}

const CHECKLIST_ITEMS = [
    'Review financials and projections',
    'Validate legal compliance and licenses',
    'Assess founder background and team',
    'Analyze market size and competition',
    'Evaluate risk and exit strategy',
];

interface ChecklistItem {
    id: string;
    text: string;
    checked: boolean;
}

const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95vw', sm: 480, md: 520, lg: 560 },
    maxWidth: { xs: '95vw', sm: 480, md: 520, lg: 560 },
    bgcolor: 'background.paper',
    borderRadius: '12px',
    boxShadow: 24,
    p: { xs: 2, sm: 3, md: 3 },
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 0,
};

export const ChecklistModal: React.FC<ChecklistModalProps> = ({ open, onClose, onContinue }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    // Initialize checklist items with unchecked state
    const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>(
        CHECKLIST_ITEMS.map((item, index) => ({
            id: `item-${index}`,
            text: item,
            checked: false,
        }))
    );

    // Loading state
    const [isLoading, setIsLoading] = useState(false);

    // Check if all items are checked
    const allItemsChecked = checklistItems.every(item => item.checked);

    // Handle checkbox toggle
    const handleItemToggle = (itemId: string) => {
        setChecklistItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
            )
        );
    };

    // Handle continue button click
    const handleContinue = () => {
        if (allItemsChecked && onContinue) {
            setIsLoading(true);
            setTimeout(() => {
                onContinue();
            }, 1500);
        }
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="checklist-modal" aria-describedby="due-diligence-checklist">
            <Box sx={style}>
                {/* Header */}
                <Box sx={{ width: '100%', textAlign: 'left', mb: 3 }}>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                            mb: 1,
                            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                            color: '#181818',
                            lineHeight: 1.2
                        }}
                    >
                        Due Diligence Checklist
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: '#6A6A6A',
                            fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                            lineHeight: 1.4
                        }}
                    >
                        Please tick the steps you have completed
                    </Typography>
                </Box>

                {/* Checklist Items */}
                <Box sx={{ width: '100%', mb: 3 }}>
                    {checklistItems.map((item, idx) => (
                        <Box
                            key={item.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                py: 2,
                                px: 0,
                                borderBottom: idx !== checklistItems.length - 1 ? '1px solid #e0e0e0' : 'none',
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#f8f9fa',
                                },
                                borderRadius: '4px',
                                transition: 'background-color 0.2s ease',
                            }}
                            onClick={() => handleItemToggle(item.id)}
                        >
                            <Checkbox
                                checked={item.checked}
                                onChange={(e) => {
                                    e.stopPropagation();
                                    handleItemToggle(item.id);
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                sx={{
                                    mr: 2,
                                    flexShrink: 0,
                                    p: 0.5,
                                    '& .MuiSvgIcon-root': {
                                        fontSize: 20,
                                    },
                                    '&.Mui-checked': {
                                        color: '#6A6A6A',
                                    },
                                    '&:hover': {
                                        backgroundColor: 'rgba(106, 106, 106, 0.04)',
                                    },
                                    '&.MuiCheckbox-root': {
                                        borderRadius: '4px',
                                    },
                                }}
                            />
                            <Typography
                                variant="body1"
                                fontWeight={500}
                                sx={{
                                    fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
                                    color: '#222',
                                    lineHeight: 1.4,
                                    flex: 1,
                                    userSelect: 'none'
                                }}
                            >
                                {item.text}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* Continue Button */}
                <Button
                    variant="contained"
                    fullWidth
                    disabled={!allItemsChecked || isLoading}
                    onClick={handleContinue}
                    sx={{
                        backgroundColor: allItemsChecked && !isLoading ? '#33CC33' : '#D4D4D4',
                        color: allItemsChecked && !isLoading ? '#fff' : '#FFFFFF',
                        borderRadius: '8px',
                        fontWeight: 600,
                        fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                        py: { xs: 1.5, sm: 1.75, md: 2 },
                        width: '100%',
                        textTransform: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                            backgroundColor: allItemsChecked && !isLoading ? '#28a428' : '#D4D4D4',
                            color: allItemsChecked && !isLoading ? '#fff' : '#FFFFFF',
                        },
                        '&:disabled': {
                            backgroundColor: isLoading ? '#28a428' : '#D4D4D4',
                            color: isLoading ? '#fff' : '#FFFFFF',
                            opacity: isLoading ? 0.7 : 1,
                        },
                    }}
                >
                    {isLoading ? (
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CircularProgress size={20} sx={{ color: '#fff' }} />
                        </Box>
                    ) : (
                        'Continue'
                    )}
                </Button>
            </Box>
        </Modal>
    );
};

export default ChecklistModal; 