"use client";

import TanTable from '@/components/General/TanTable';
import { useBusinessSelector } from "@/Redux/selectors";
import { Box, Button } from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import { useEditListingDocumentsMutation, useGetBusinessListingDocumentsQuery, useReUploadDocumentMutation } from '../queries/businessApi';
import { isProd } from '../utils/helpers';

// const companyTabs = [
//     {
//         label: 'AgriHarvest',
//         value: 'agriharvest',
//         data: [
//             { document: 'AgriHarvest Report.pdf', status: "Uploaded" },
//             { document: 'Q1 Financials.xlsx', status: "Not Uploaded" },
//         ],
//     },
//     {
//         label: 'MedConnect Health',
//         value: 'medconnect',
//         data: [
//             { document: 'MedConnect Overview.pdf', status: "Uploaded" },
//             { document: 'Clinical Trials.docx', status: "Not Uploaded" },
//         ],
//     },
//     {
//         label: 'TechPay Solutions',
//         value: 'techpay',
//         data: [
//             { document: 'TechPay Whitepaper.pdf', status: "Uploaded" },
//             { document: 'API Docs.pdf', status: "Not Uploaded" },
//         ],
//     },
//     {
//         label: 'UrbanStay Suites',
//         value: 'urbanstay',
//         data: [
//             { document: 'UrbanStay Lease.pdf', status: "Uploaded" },
//             { document: 'Guest Policy.pdf', status: "Not Uploaded" },
//         ],
//     },
// ];

// const tabColumns = [
//     { accessorKey: 'document', header: 'Document' },
//     {
//         id: 'status',
//         header: 'Status',
//         cell: ({ row }: any) => (
//             <div className="flex gap-2">
//                 <span className="text-sm">{row.status}</span>
//             </div>
//         ),
//     },
//     {
//         id: 'action',
//         header: 'Action',
//         cell: ({ row }: any) => (
//             <div className="flex gap-2">
//                 <button
//                     className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-blue-600 hover:underline transition"
//                 >
//                     Download
//                 </button>

//                 <button
//                     className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-green-600 hover:underline transition"
//                 >
//                     View
//                 </button>
//             </div>
//         ),
//     },
// ];

// const columns = [
//     { header: 'DOCUMENT NAME', accessorKey: 'documentName' },
//     {
//         header: 'STATUS', accessorKey: 'status', cell: ({ row }: any) => (
//             <span className={`px-2 py-1 rounded text-xs ${row.original.featured ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
//                 {row.original.featured ? 'Uploaded' : 'Not Uploaded'}
//             </span>
//         )
//     },
//     {
//         id: 'action',
//         header: 'ACTION',
//         cell: ({ row }: any) => (
//             <div>
//                 {row.original.featured && (
//                     <>
//                         <span
//                             className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-purple-600 hover:underline transition"
//                         >
//                             Download
//                         </span>

//                         <span
//                             className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-green-600 hover:underline transition"
//                         >
//                             View
//                         </span>
//                     </>
//                 )}

//                 <span
//                     className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-blue-600 hover:underline transition flex items-center gap-1"
//                     onClick={() => handleFileSelect(row.original.documentName)}
//                 >
//                     {uploadingDocuments[row.original.documentName] ? (
//                         <>
//                             <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//                             Uploading...
//                         </>
//                     ) : (
//                         'Upload'
//                     )}
//                 </span>

//                 <input
//                     type="file"
//                     ref={(el) => {
//                         fileInputRefs.current[row.original.documentName] = el;
//                     }}
//                     onChange={(e) => handleFileChange(row.original.documentName, e)}
//                     accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
//                     style={{ display: 'none' }}
//                 />
//             </div>
//         ),
//     },
// ];

interface DocumentData {
    document: string;
}

interface CompanyTab {
    label: string;
    value: string;
    data: DocumentData[];
}

interface TableColumn {
    accessorKey?: string;
    header: string;
    id?: string;
    cell?: ({ row }: { row: any }) => React.ReactElement;
}

const companyTabs: CompanyTab[] = [
    {
        label: 'AgriHarvest',
        value: 'agriharvest',
        data: [
            { document: 'AgriHarvest Report.pdf' },
            { document: 'Q1 Financials.xlsx' },
        ],
    },
    {
        label: 'MedConnect Health',
        value: 'medconnect',
        data: [
            { document: 'MedConnect Overview.pdf' },
            { document: 'Clinical Trials.docx' },
        ],
    },
    {
        label: 'TechPay Solutions',
        value: 'techpay',
        data: [
            { document: 'TechPay Whitepaper.pdf' },
            { document: 'API Docs.pdf' },
        ],
    },
    {
        label: 'UrbanStay Suites',
        value: 'urbanstay',
        data: [
            { document: 'UrbanStay Lease.pdf' },
            { document: 'Guest Policy.pdf' },
        ],
    },
];

const tabColumns: TableColumn[] = [
    { accessorKey: 'document', header: 'Document' },
    {
        id: 'action',
        header: 'Action',
        cell: ({ row }: any) => (
            <div className="flex gap-2">
                <button
                    className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-blue-600 hover:underline transition"
                >
                    Download
                </button>

                <button
                    className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-green-600 hover:underline transition"
                >
                    View
                </button>
            </div>
        ),
    },
];

const DocumentsPage = () => {

    const { businessUserProfile } = useBusinessSelector();
    const { data: listingDocuments, refetch: fetchListingDocuments } = useGetBusinessListingDocumentsQuery(businessUserProfile?.business_id);
    const [reUploadDocument, { isLoading: isUploading }] = useReUploadDocumentMutation();
    const [editListingDocuments] = useEditListingDocumentsMutation();

    const [search, setSearch] = useState<string>('');
    const [uploadPath, setUploadPath] = useState<string>('');
    const [activeTab, setActiveTab] = useState<string>(companyTabs[0].value);
    const [uploadingDocuments, setUploadingDocuments] = useState<Record<string, boolean>>({});

    const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({});

    const currentTab = companyTabs.find(tab => tab.value === activeTab);
    const filteredData = useMemo(() => {
        if (!search) return currentTab?.data || [];
        return (currentTab?.data || []).filter(row =>
            Object.values(row).some(val =>
                String(val).toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, currentTab]);

    const handleSearch = (val: string) => setSearch(val);

    const handleTabChange = (val: string) => {
        setActiveTab(val);
        setSearch('');
    };

    const handleFileUpload = async (documentKey: string, file: File) => {
        try {
            setUploadingDocuments(prev => ({ ...prev, [documentKey]: true }));

            const formData = new FormData();
            formData.append('file', file);

            const response = await reUploadDocument(formData).unwrap();

            const complianceKeys = ['legal_compliance_certificate', 'founder_agreements'];
            let payloadToSend: any = {
                payload: {
                    user_id: businessUserProfile?.user_id,
                    listing_id: listingDocuments?.payload?.listing_id,
                    is_complete: true,
                }
            };

            if (complianceKeys.includes(documentKey)) {
                payloadToSend.compliance_and_verification = {
                    [documentKey]: response.payload
                };
            } else {
                payloadToSend.essential_documents = {
                    [documentKey]: response.payload
                };
            }

            await editListingDocuments(payloadToSend);
            await fetchListingDocuments();

        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploadingDocuments(prev => ({ ...prev, [documentKey]: false }));
        }
    };

    const handleFileSelect = (documentKey: string) => {
        const fileInput = fileInputRefs.current[documentKey];
        if (fileInput) {
            fileInput.click();
        }
    };

    const handleDownload = (documentType: string) => {
        if (!listingDocuments?.payload) return;

        const isComplianceDoc = ['legal_compliance_certificate', 'founder_agreements'].includes(documentType);
        const documentUrl = isComplianceDoc
            ? (listingDocuments.payload.compliance_and_verification as any)?.[documentType]
            : (listingDocuments.payload.essential_documents as any)?.[documentType];

        if (documentUrl) {
            const link = document.createElement('a');
            link.href = documentUrl;
            link.download = `${documentType.replace(/_/g, ' ')}.pdf`;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            console.error('Document URL not found for type:', documentType);
        }
    };

    const viewSpecificDoc = (documentType: string) => {
        const isComplianceDoc = ['legal_compliance_certificate', 'founder_agreements'].includes(documentType);
        const documentUrl = listingDocuments?.payload && isComplianceDoc
            ? (listingDocuments.payload.compliance_and_verification as any)?.[documentType]
            : listingDocuments?.payload
                ? (listingDocuments.payload.essential_documents as any)?.[documentType]
                : null;

        if (documentUrl) {
            window.open(`https://docs.google.com/gview?url=${documentUrl}&embedded=true`, "_blank", "noopener,noreferrer");
        }
    }

    const handleFileChange = (documentKey: string, event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            handleFileUpload(documentKey, file);
        }
    };

    const handleSendMessageToAdmin = () => {
        window.location.href = 'mailto:ayusuf84@gmail.com';
    };

    const columns = [
        { header: 'DOCUMENT NAME', accessorKey: 'documentName' },
        {
            header: 'STATUS', accessorKey: 'status', cell: ({ row }: any) => (
                <span className={`px-2 py-1 rounded text-xs ${row.original.featured ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {row.original.featured ? 'Uploaded' : 'Not Uploaded'}
                </span>
            )
        },
        {
            id: 'action',
            header: 'ACTION',
            cell: ({ row }: any) => (
                <div className="flex items-center gap-2">
                    {row.original.featured && (
                        !isProd && (
                            <>
                                <span
                                    className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-purple-600 hover:underline transition"
                                    onClick={() => handleDownload(row.original.type)}
                                >
                                    Download
                                </span>

                                <span
                                    className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-green-600 hover:underline transition"
                                    onClick={() => viewSpecificDoc(row.original.type)}
                                >
                                    View
                                </span>
                            </>
                        )
                    )}

                    <span
                        className="text-sm px-2 py-1 underline cursor-pointer text-[#1E1E1E] hover:text-blue-600 hover:underline transition flex items-center gap-1"
                        onClick={() => handleFileSelect(row.original.type)}
                    >
                        {uploadingDocuments[row.original.type] ? (
                            <>
                                <div className="w-3 h-3 border border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                Uploading...
                            </>
                        ) : (
                            'Upload'
                        )}
                    </span>

                    <input
                        type="file"
                        ref={(el) => {
                            fileInputRefs.current[row.original.type] = el;
                        }}
                        onChange={(e) => handleFileChange(row.original.type, e)}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
                        style={{ display: 'none' }}
                    />
                </div>
            ),
        },
    ];

    const initialData = listingDocuments !== undefined ? [
        { documentName: 'Cap Table', type: "cap_table", featured: listingDocuments?.payload?.essential_documents?.cap_table !== "", },
        { documentName: 'Pitch Deck', type: "pitch_deck", featured: listingDocuments?.payload?.essential_documents?.pitch_deck !== "", },
        { documentName: 'Product Demo', type: "product_demo", featured: listingDocuments?.payload?.essential_documents?.product_demo !== "", },
        { documentName: 'Director ID', type: "director_id", featured: listingDocuments?.payload?.essential_documents?.director_id !== "", },
        { documentName: 'Business Plan', type: "business_plan", featured: listingDocuments?.payload?.essential_documents?.business_plan !== "", },
        { documentName: 'Market Analysis', type: "market_analysis", featured: listingDocuments?.payload?.essential_documents?.market_analysis !== "", },
        { documentName: 'Legal Agreements', type: "legal_agreements", featured: listingDocuments?.payload?.essential_documents?.legal_agreements !== "", },
        { documentName: 'Customer References', type: "customer_references", featured: listingDocuments?.payload?.essential_documents?.customer_references !== "", },
        { documentName: 'Financial Statements', type: "financial_statements", featured: listingDocuments?.payload?.essential_documents?.financial_statements !== "", },
        { documentName: 'Financial Projections', type: "financial_projections", featured: listingDocuments?.payload?.essential_documents?.financial_projections !== "", },
        { documentName: 'Certificate of Incorporation', type: "certificate_of_incorporation", featured: listingDocuments?.payload?.essential_documents?.certificate_of_incorporation !== "", },
        { documentName: 'Legal Compliance Certificate', type: "legal_compliance_certificate", featured: listingDocuments?.payload?.compliance_and_verification?.legal_compliance_certificate !== "", },
        { documentName: 'Founder Agreements', type: "founder_agreements", featured: listingDocuments?.payload?.compliance_and_verification?.founder_agreements !== "", },
    ] : [];

    // console.log(listingDocuments);

    return (
        <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
            {/* <TanTable
                columnData={tabColumns}
                data={filteredData}
                showHeader={{
                    title: "Documents",
                    subTitle: "List of all uploaded documents",
                    search: {
                        value: search,
                        onChange: handleSearch
                    }
                }}
                customContent={
                    <SwitchTabs
                        tabs={companyTabs.map(tab => ({
                            label: tab.label,
                            value: tab.value,
                            component: (
                                <div className="-mt-6">
                                    <TanTable
                                        columnData={tabColumns}
                                        data={tab.value === activeTab ? filteredData : tab.data}
                                        showHeader={undefined}
                                        rowBorderLine
                                        colBorderLine
                                    />
                                </div>
                            )
                        }))}
                        initialTab={companyTabs[0].value}
                        value={activeTab}
                        onChange={handleTabChange}
                    />
                }
                rowBorderLine
                colBorderLine
            /> */}
            {
                initialData.length === 0 && (
                    <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg'>
                        <p className="text-red-600 text-sm font-medium">
                            Business Creation Error - Unable to load documents
                        </p>
                    </div>
                )
            }

            <TanTable
                columnData={columns}
                data={initialData}
                showHeader={{
                    title: "Document Management",
                    subTitle: "View and manage document management records",
                    search: true,
                    noColor: true,
                }}
                colBorderLine
                rowBorderLine
                preservePageOnDataChange={true}
                onRefresh={() => { fetchListingDocuments() }}
            />

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleSendMessageToAdmin}
                    sx={{
                        px: 3,
                        py: 1,
                        fontSize: '14px',
                        textTransform: 'none',
                    }}
                >
                    Contact Support
                </Button>
            </Box>
        </Box>
    );
}

export default DocumentsPage;