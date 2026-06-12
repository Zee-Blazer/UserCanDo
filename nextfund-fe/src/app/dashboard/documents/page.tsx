'use client';

// import DocumentsTable from '@/components/(dashboard)/documents/documents-table';
import { SearchHeader } from '@/components/General/ui/custom-search';
import { Box, Paper } from '@mui/material';
import { useState } from 'react';

const DocumentsPage = () => {
    const [search, setSearch] = useState('');

    return (
        // <Box sx={{ width: '100%', px: { xs: 1, sm: 2, md: 4 }, py: { xs: 2, sm: 3 } }}>
        //     <Paper elevation={0} sx={{ borderRadius: '8px', border: '1px solid #e0e0e0', p: 2, mb: 2 }}>
        //         <SearchHeader
        //             title="Documents"
        //             subtitle="All documents related to your investments in one place."
        //             searchPlaceholder="Search for document..."
        //             searchValue={search}
        //             onSearchChange={(e) => setSearch(e.target.value)}
        //             searchWidth={{ xs: '100%', sm: '180px', md: '250px' }}
        //         />
        //     </Paper>
        //     <DocumentsTable search={search} />
        // </Box>
        <Box sx={{ width: '100%', px: { xs: 1, sm: 2, md: 4 }, py: { xs: 2, sm: 3 } }}>
            <Paper elevation={0} sx={{ borderRadius: '8px', border: '1px solid #e0e0e0', p: 2, mb: 2 }}>
                <SearchHeader
                    title="Documents"
                    subtitle="This page is currently unavailable."
                    searchPlaceholder="Search for document..."
                    searchValue={search}
                    onSearchChange={(e) => setSearch(e.target.value)}
                    searchWidth={{ xs: '100%', sm: '180px', md: '250px' }}
                />
            </Paper>
            {/* <DocumentsTable search={search} /> */}
        </Box>
    );
};

export default DocumentsPage; 