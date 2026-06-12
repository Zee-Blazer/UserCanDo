"use client";
import { ViewOpportunityDetails } from '@/components/(dashboard)/opportunities/view-opportunity/ViewOpportunityDetails';
import { useParams } from 'next/navigation';

export default function OpportunityDetailPage() {
    const params = useParams();
    const opportunityId = params.id as string;

    if (!opportunityId || opportunityId === 'undefined' || opportunityId === undefined) {
        return (
            <div style={{ padding: '20px', color: 'red', textAlign: 'center' }}>
                <h2>Error: Invalid Opportunity ID</h2>
                <p>Opportunity ID: {opportunityId}</p>
                <p>Params: {JSON.stringify(params)}</p>
                <p>URL: {typeof window !== 'undefined' ? window.location.href : 'SSR'}</p>
                <p>Please go back and try again.</p>
            </div>
        );
    }

    return (
        <ViewOpportunityDetails opportunityId={opportunityId} />
    );
}
