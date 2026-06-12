import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

interface InfoTooltipProps {
    title: string;
    description: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({
    title,
    description,
    placement = 'right'
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [open, setOpen] = useState(false);
    const [hoverOpen, setHoverOpen] = useState(false);

    const handleTouchStart = (e: React.TouchEvent) => {
        e.preventDefault();
        setOpen(true);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        e.preventDefault();
        // Delay closing to allow user to read the tooltip
        setTimeout(() => setOpen(false), 2000);
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isMobile) {
            setOpen(!open);
        }
    };

    const handleMouseEnter = () => {
        if (!isMobile) {
            setHoverOpen(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setHoverOpen(false);
        }
    };

    const tooltipContent = (
        <Box sx={{ p: 1 }}>
            <Typography component="div" variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                {title}
            </Typography>
            <Typography component="div" variant="body2" sx={{ fontSize: '0.875rem' }}>
                {description}
            </Typography>
        </Box>
    );

    return (
        <Tooltip
            title={tooltipContent}
            placement={placement}
            arrow
            open={isMobile ? open : hoverOpen}
            disableHoverListener={isMobile}
            disableFocusListener={isMobile}
            disableTouchListener={false}
            onClose={() => {
                setOpen(false);
                setHoverOpen(false);
            }}
            PopperProps={{
                disablePortal: isMobile
            }}
            sx={{
                '& .MuiTooltip-tooltip': {
                    backgroundColor: '#333',
                    maxWidth: isMobile ? 280 : 300,
                    fontSize: '0.875rem',
                    padding: '12px 16px',
                    zIndex: 9999,
                    ...(isMobile && {
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: '90vw',
                        width: 'auto'
                    })
                },
                '& .MuiTooltip-arrow': {
                    color: '#333',
                    ...(isMobile && { display: 'none' })
                }
            }}
        >
            <InfoOutlinedIcon
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                sx={{
                    fontSize: 18,
                    color: '#666',
                    cursor: isMobile ? 'pointer' : 'help',
                    ml: 0.5,
                    verticalAlign: 'middle',
                    '&:hover': {
                        color: '#33CC33'
                    },
                    '&:active': {
                        color: '#33CC33'
                    }
                }}
            />
        </Tooltip>
    );
};

