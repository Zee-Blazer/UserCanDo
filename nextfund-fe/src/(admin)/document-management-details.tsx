"use client";

import DocumentChecklist from "../components/business/home/document-checklist";
import SpannedBtn from "../components/business/home/spanned-btn";
import ContentContainer from "../components/business/investors/content-container";

const documentList = [
    { title: "Proof of funds", description: "3.5MB", info: { timeStamp: "2 days ago", download: true } },
    { title: "Signed term sheet", description: "3.5MB", info: { timeStamp: "2 days ago", download: true } },
    { title: "Signed term sheet", description: "3.5MB", info: { timeStamp: "2 days ago", download: true } },
    { title: "Signed term sheet", description: "3.5MB", info: { timeStamp: "2 days ago", download: true } },
];

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
            text: "Flag",
            type: "border-danger",
            func: () => {
                console.log("Request missing docs")
            },
        },
        {
            text: "Approved",
            type: "grass",
            func: () => {
                console.log("Mark as verified")
            },
        },
    ];

const AdminDocumentManagementDetails = () => {

    return (
        <ContentContainer
            text="Document Management"
            showSidenav={false}
        >
            <div className="-mt-6"></div>
            <DocumentChecklist
                title="Document"
                type="paper"
                documents={documentList}
            />
            <SpannedBtn buttons={actionButtons} />
        </ContentContainer>
    )
}

export default AdminDocumentManagementDetails;
