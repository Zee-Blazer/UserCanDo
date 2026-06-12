// import {
//     Box,
//     Link,
//     Paper,
//     Table,
//     TableBody,
//     TableCell,
//     TableContainer,
//     TableHead,
//     TableRow
// } from '@mui/material';
import React from 'react';
// import { isProd } from '../../../utils/helpers';

// interface DocumentsTableProps {
//     search: string;
// }

{/* NOT PROD READY - COMMENTED OUT */ }
// const investments = !isProd ? [
//     {
//         name: 'AgriHarvest',
//         documents: [
//             'Pitch Deck.pdf',
//             'Financials_Q1_2025.pdf',
//             'Business Plan_2024.pdf',
//             'Legal_Agreement_Signed.pdf',
//             'Impact_Report_Mar_2025.pdf',
//         ],
//     },
//     {
//         name: 'MedConnect Health',
//         documents: [],
//     },
//     {
//         name: 'TechPay Solutions',
//         documents: [],
//     },
//     {
//         name: 'UrbanStay Suites',
//         documents: [],
//     },
// ] : [];

const DocumentsTable: React.FC<any> = ({ search }) => {
    // Component commented out - returns null
    return null;

    // // Filter logic for search
    // const filteredDocs = investments.map((inv) => ({
    //     ...inv,
    //     documents: inv.documents.filter((doc) =>
    //         doc.toLowerCase().includes(search.toLowerCase())
    //     ),
    // }));

    // // Find max number of docs for row rendering
    // const maxRows = Math.max(...filteredDocs.map((inv) => inv.documents.length));

    // return (
    //     <TableContainer component={Paper} sx={{ mt: 1, borderRadius: '10px', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
    //         <Table sx={{ minWidth: 650 }} aria-label="documents table">
    //             <TableHead>
    //                 <TableRow>
    //                     {investments.map((inv, idx) => (
    //                         <TableCell
    //                             key={inv.name}
    //                             align="left"
    //                             sx={{
    //                                 background: '#fafafa',
    //                                 fontWeight: 500,
    //                                 fontSize: { xs: '1rem', sm: '1.1rem' },
    //                                 borderRight: idx !== investments.length - 1 ? '1px solid #e0e0e0' : 'none',
    //                                 textAlign: 'center',
    //                             }}
    //                         >
    //                             {inv.name}
    //                         </TableCell>
    //                     ))}
    //                 </TableRow>
    //                 <TableRow>
    //                     <TableCell sx={{ fontWeight: 600, fontSize: '0.98rem' }}>DOCUMENT</TableCell>
    //                     <TableCell sx={{ fontWeight: 600, fontSize: '0.98rem' }}></TableCell>
    //                     <TableCell sx={{ fontWeight: 600, fontSize: '0.98rem' }}>ACTION</TableCell>
    //                     <TableCell sx={{ fontWeight: 600, fontSize: '0.98rem' }}></TableCell>
    //                 </TableRow>
    //             </TableHead>
    //             <TableBody>
    //                 {[...Array(maxRows)].map((_, rowIdx) => (
    //                     <TableRow key={rowIdx}>
    //                         {/* AgriHarvest */}
    //                         <TableCell sx={{ borderRight: '1px solid #e0e0e0', minWidth: 180 }}>
    //                             {filteredDocs[0].documents[rowIdx] || ''}
    //                         </TableCell>
    //                         {/* MedConnect Health */}
    //                         <TableCell sx={{ borderRight: '1px solid #e0e0e0', minWidth: 180 }}>
    //                             {filteredDocs[1].documents[rowIdx] || ''}
    //                         </TableCell>
    //                         {/* TechPay Solutions (ACTION here) */}
    //                         <TableCell sx={{ borderRight: '1px solid #e0e0e0', minWidth: 180 }}>
    //                             {filteredDocs[2].documents[rowIdx] || ''}
    //                             {filteredDocs[0].documents[rowIdx] && (
    //                                 <Box sx={{ display: 'flex', gap: 2 }}>
    //                                     <Link href="#" underline="hover" sx={{ color: '#222', fontWeight: 400 }}>
    //                                         Download
    //                                     </Link>
    //                                     <Link href="#" underline="hover" sx={{ color: '#222', fontWeight: 400 }}>
    //                                         View
    //                                     </Link>
    //                                 </Box>
    //                             )}
    //                         </TableCell>
    //                         {/* UrbanStay Suites */}
    //                         <TableCell sx={{ minWidth: 180 }}>
    //                             {filteredDocs[3].documents[rowIdx] || ''}
    //                         </TableCell>
    //                     </TableRow>
    //                 ))}
    //             </TableBody>
    //         </Table>
    //     </TableContainer>
    // );
};

export default DocumentsTable; 