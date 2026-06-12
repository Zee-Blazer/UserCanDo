
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';

export interface SwitchTabConfig {
    label: string;
    value: string;
    component: React.ReactNode;
}

interface SwitchTabsProps {
    tabs: SwitchTabConfig[];
    initialTab?: string;
    sx?: object;
    value?: string;
    onChange?: (val: string) => void;
}

const SwitchTabs: React.FC<SwitchTabsProps> = ({ tabs, initialTab, sx, value, onChange }) => {
    const [internalTab, setInternalTab] = useState<string>(initialTab || tabs[0]?.value);
    const activeTab = value !== undefined ? value : internalTab;
    const setActiveTab = (val: string) => {
        if (onChange) onChange(val);
        else setInternalTab(val);
    };
    const activeTabConfig = tabs.find(tab => tab.value === activeTab);

    return (
        <Box sx={{ mb: 4, ...sx }}>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    mb: 3,
                    borderRadius: '8px',
                    overflow: 'auto',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    backgroundColor: '#fff',
                    border: '1px solid #e0e0e0',
                    width: '100%',
                    WebkitOverflowScrolling: 'touch',
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    '&::-webkit-scrollbar': { display: 'none' },
                }}
            >
                {tabs.map(tab => (
                    <Button
                        key={tab.value}
                        onClick={() => setActiveTab(tab.value)}
                        sx={{
                            flex: { xs: '0 0 auto', sm: 1 },
                            minWidth: { xs: 120, sm: 0 },
                            borderRadius: 0,
                            py: { xs: 1.5, sm: 1 },
                            px: { xs: 2, sm: 0 },
                            backgroundColor: activeTab === tab.value ? 'transparent' : '#f5f5f5',
                            color: '#17406D',
                            fontWeight: 500,
                            fontSize: { xs: '1rem', sm: '0.9rem' },
                            boxShadow: 'none',
                            transition: 'background 0.2s',
                            whiteSpace: 'nowrap',
                            '&:hover': {
                                backgroundColor: activeTab === tab.value ? '#f9f9f9' : '#f5f5f5',
                                boxShadow: 'none',
                            },
                        }}
                    >
                        {tab.label}
                    </Button>
                ))}
            </Box>

            <Box>
                {activeTabConfig?.component}
            </Box>
        </Box>
    );
};

export default SwitchTabs;
