"use client";
import { InvestmentDocumentsSuccess } from '@/components/(dashboard)/opportunities/view-opportunity/investment-documents-success';
import { useParams } from 'next/navigation';

export default function InvestDocumentsSuccessPage() {
    const params = useParams();
    const opportunityId = params.id as string;

    if (!opportunityId || opportunityId === 'undefined') {
        return (
            <div style={{ padding: '20px', color: 'red' }}>
                <h2>Error: Invalid Opportunity ID</h2>
                <p>Opportunity ID: {opportunityId}</p>
                <p>Params: {JSON.stringify(params)}</p>
                <p>URL: {window.location.href}</p>
            </div>
        );
    }

    return <InvestmentDocumentsSuccess opportunityId={opportunityId} />;
} 