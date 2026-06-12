import { Box, Typography } from '@mui/material';
import React from 'react';
import type { DeclarationSectionProps } from './types';
import { DECLARATION_ITEMS } from './types';

export const DeclarationSection: React.FC<DeclarationSectionProps> = ({
    declarations,
    onDeclarationChange
}) => {

    const handleCheckboxChange = (key: keyof typeof declarations) => {
        const newValue = !declarations[key];
        onDeclarationChange(key, newValue);
    };

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    color: '#333',
                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                }}
            >
                Declaration
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {DECLARATION_ITEMS.map((item) => (
                    <Box key={item.key} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, position: 'relative' }}>

                        <input
                            type="checkbox"
                            id={`declaration-${item.key}`}
                            checked={declarations[item.key]}
                            onChange={() => handleCheckboxChange(item.key)}
                            style={{
                                position: 'absolute',
                                opacity: 0,
                                pointerEvents: 'none',
                                zIndex: -1
                            }}
                        />

                        {/* Custom Checkbox */}
                        <Box
                            component="button"
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleCheckboxChange(item.key);
                            }}
                            onMouseDown={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            sx={{
                                width: 24,
                                height: 24,
                                border: declarations[item.key] ? '2px solid #4CAF50' : '2px solid #D4D4D4',
                                borderRadius: '4px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backgroundColor: declarations[item.key] ? '#4CAF50' : 'transparent',
                                transition: 'all 0.2s ease',
                                flexShrink: 0,
                                mt: 0.25,
                                padding: 0,
                                minWidth: 'unset',
                                outline: 'none',
                                pointerEvents: 'auto',
                                position: 'relative',
                                zIndex: 10,
                                '&:hover': {
                                    borderColor: declarations[item.key] ? '#45a049' : '#B0B0B0',
                                    backgroundColor: declarations[item.key] ? '#45a049' : '#F5F5F5',
                                    transform: 'scale(1.05)'
                                },
                                '&:active': {
                                    transform: 'scale(0.95)'
                                },
                                '&:focus': {
                                    outline: '2px solid #4CAF50',
                                    outlineOffset: '2px'
                                }
                            }}
                        >
                            {declarations[item.key] && (
                                <Box
                                    sx={{
                                        width: '12px',
                                        height: '8px',
                                        color: '#FFFFFF',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    ✓
                                </Box>
                            )}
                        </Box>

                        {/* Text with underline */}
                        <Box
                            component="label"
                            htmlFor={`declaration-${item.key}`}
                            sx={{
                                flex: 1,
                                cursor: 'pointer',
                                display: 'block',
                                '&:focus': {
                                    outline: '2px solid #D4D4D4',
                                    outlineOffset: '2px',
                                    borderRadius: '4px'
                                }
                            }}
                        >
                            <Typography
                                sx={{
                                    color: '#333',
                                    fontSize: '16px',
                                    lineHeight: 1.5,
                                    borderBottom: '1px solid #D4D4D4',
                                    paddingBottom: '8px',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    width: '100%'
                                }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};
