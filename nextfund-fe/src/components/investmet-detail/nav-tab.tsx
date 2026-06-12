import {
    Box,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { TabItem } from '../../types/landing-page';

interface NavigationTabsProps {
    tabs: TabItem[];
    activeTab: string;
    setActiveTab: (tabId: string) => void;
}


const tabIconMap: Record<string, string> = {
    overview: '/light_info.png',
    team: '/people-blue.png',
    financials: '/finance.png',
    documents: '/document-light.png',
};

export const NavigationTabs: React.FC<NavigationTabsProps> = ({ tabs, activeTab, setActiveTab }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{
                display: 'flex',
                mb: { xs: 3, md: 4 },
                overflowX: { xs: 'auto', md: 'visible' },
                width: '100%',
                '@media (max-width: 900px)': {
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    bgcolor: '#E0E0E0',
                    border: '1px solid #E0E3E7',
                    borderRadius: '999px',
                    width: '100%',
                    maxWidth: 750,
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    minWidth: { xs: 'fit-content', md: 0 },
                    pr: { xs: 2, md: 0 },
                }}
            >
                {tabs.map((tab) => (
                    <Box
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 1, md: 1.5 },
                            px: { xs: 2, sm: 3, md: 5 },
                            py: { xs: 1.2, sm: 1.5, md: 2.5 },
                            cursor: 'pointer',
                            backgroundColor: activeTab === tab.id ? '#FFFFFF' : 'transparent',
                            borderRadius: 0,
                            boxShadow: 'none',
                            transition: 'background-color 0.2s',
                            minWidth: { xs: 90, sm: 110, md: 0 },
                            border: 'none',
                            '&:hover': {
                                backgroundColor: '#FFFFFF',
                            },
                        }}
                    >
                        <Image
                            src={tabIconMap[tab.id] || '/light_info.png'}
                            alt={tab.label + ' icon'}
                            width={20}
                            height={20}
                            style={{ marginRight: 8, filter: activeTab === tab.id ? 'none' : 'grayscale(60%)', opacity: activeTab === tab.id ? 1 : 0.7 }}
                            priority
                        />
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#043A66',
                                fontWeight: activeTab === tab.id ? 600 : 500,
                                fontSize: { xs: '0.92rem', sm: '1rem', md: '1.1rem' },
                                whiteSpace: 'nowrap',
                                overflow: { xs: 'hidden', sm: 'hidden', md: 'visible' },
                                textOverflow: { xs: 'ellipsis', sm: 'ellipsis', md: 'unset' },
                                transition: 'color 0.2s',
                            }}
                        >
                            {tab.label}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};