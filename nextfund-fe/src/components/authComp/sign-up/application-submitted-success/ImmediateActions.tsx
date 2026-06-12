import { Box, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import type { ImmediateActionsProps } from './types';

const isProd = process.env.NODE_ENV === 'production';

export const ImmediateActions: React.FC<ImmediateActionsProps> = ({ actions }) => {
    // NOT PROD READY - Hide entire section in production
    if (isProd) {
        return null;
    }

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: '#333',
                    fontSize: '1.125rem'
                }}
            >
                Immediate Actions Available
            </Typography>

            {actions.map((action) => (
                <Box
                    key={action.id}
                    sx={{
                        width: '100%',
                        borderBottom: '1px solid #e0e0e0',
                        paddingBottom: 1,
                        marginBottom: 1.5
                    }}
                >
                    {action.href ? (
                        <Link
                            href={action.href}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                display: 'block',
                                width: '100%'
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    fontWeight: 500,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        color: '#4CAF50'
                                    }
                                }}
                            >
                                {action.title}
                            </Typography>
                        </Link>
                    ) : (
                        <Box
                            component="button"
                            onClick={action.onClick}
                            sx={{
                                all: 'unset',
                                width: '100%',
                                cursor: 'pointer',
                                textAlign: 'left'
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    fontWeight: 500,
                                    '&:hover': {
                                        color: '#4CAF50'
                                    }
                                }}
                            >
                                {action.title}
                            </Typography>
                        </Box>
                    )}
                </Box>
            ))}
        </Box>
    );
};
