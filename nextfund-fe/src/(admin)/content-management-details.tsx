"use client";

import DocumentChecklist from "../components/business/home/document-checklist";
import SpannedBtn from "../components/business/home/spanned-btn";
import ContentContainer from "../components/business/investors/content-container";
import MappedDetails from "../components/business/investors/mapped-details";

const details = [
    { label: 'Name', value: 'HalalPay' },
    { label: 'Category', value: 'FinTech' },
    { label: 'Funding Goal', value: '$100,000' },
    { label: 'Region', value: 'West Africa' },
    { label: 'Expected ROI', value: '18% over 24 months' },
];

const documentList = [
    { title: "Proof of funds", description: "3.5MB", info: { timeStamp: "2 days ago", download: true } },
    { title: "Signed term sheet", description: "3.5MB", info: { timeStamp: "2 days ago", download: true } },
    { title: "Signed term sheet", description: "3.5MB", info: { timeStamp: "2 days ago", download: true } },
    { title: "Signed term sheet", description: "3.5MB", info: { timeStamp: "2 days ago", download: true } },
];

const contentDetails = [
    { label: 'Hero Title', value: 'Invest in Real-World African Businesses' },
    { label: 'Subheading', value: 'Verified opportunities across fintech, agri-tech, and health' },
    { label: 'CTAs', value: ["Explore Listings", "Sign up to invest"] },
]

const actionButtons: Array<{
    text: string;
    type?: "muted" | "danger" | "default" | "primary" | "grass" | "border-danger";
    func: () => void;
}> = [
        {
            text: "Close",
            type: "muted",
            func: () => {
                // Close action logic here
                console.log("Close clicked");
            },
        },
        {
            text: "Edit",
            type: "grass",
            func: () => {
                console.log("Mark as verified")
            },
        },
    ];

const AdminContentManagementDetails = () => {

    return (
        <ContentContainer
            text="Content Management"
        >
            <MappedDetails
                title="Business Information"
                details={details}
            />
            <DocumentChecklist
                title="Uploads"
                type="paper"
                documents={documentList}
            />
            <div className="my-8"></div>
            <MappedDetails
                title="Content Editor"
                details={contentDetails}
            />
            <SpannedBtn buttons={actionButtons} />
        </ContentContainer>
    )
}

export default AdminContentManagementDetails;
