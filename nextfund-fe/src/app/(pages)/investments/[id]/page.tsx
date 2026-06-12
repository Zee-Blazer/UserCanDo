"use client";
import LoadingAnimation from '@/app/loading-lottie';
import { InvestmentDetailsComponent } from '@/components/investmet-detail/investment-detail';
import { Footer, Header } from '@/components/layout';
import { useGetBusinessListingDetailsQuery, useGetInvestorBusinessListingsQuery } from '@/queries/businessApi';
import { transformListingToInvestment } from '@/utils/opportunityTransformer';
import { notFound, useParams } from 'next/navigation';
import { useMemo } from 'react';


const BUSINESS_LISTING_SECTIONS = undefined;

export default function InvestmentDetailPage() {
    const params = useParams();
    const investmentId = params.id as string;


    const {
        data: listingDetailsData,
        isLoading: isLoadingDetails,
        error: detailsError
    } = useGetBusinessListingDetailsQuery(
        { listing_id: investmentId },
        { skip: !investmentId }
    );

    const hasValidListingDetails = listingDetailsData?.overview !== undefined;

    const {
        data: opportunitiesData,
        isLoading: isLoadingListings,
        error
    } = useGetInvestorBusinessListingsQuery({
        page: 1,
        page_size: 100
    }, {
        skip: !investmentId || hasValidListingDetails
    });

   
    const investment = useMemo(() => {
       
        if (listingDetailsData) {
            return null; 
        }

        if (!opportunitiesData?.payload) {
            return null;
        }

        
        const transformedListings = opportunitiesData.payload
            .map((listing: any) => {
                try {
                    return transformListingToInvestment(listing);
                } catch (error) {
                    return null;
                }
            });

        const transformedInvestments = transformedListings.filter((inv: any | null) => inv !== null) as any[];

        const foundInvestment = transformedInvestments.find((inv: any) => inv.id === investmentId);
        return foundInvestment;
    }, [opportunitiesData, investmentId, listingDetailsData]);

    // Loading state 
    if (isLoadingDetails || isLoadingListings) {
        return (
            <>
                <LoadingAnimation isVisible={true} />
            </>
        );
    }

  
    if (listingDetailsData || investment) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1">
                    <InvestmentDetailsComponent investmentId={investmentId} investment={investment || undefined} />
                </main>
                <Footer />
            </div>
        );
    }

    
    if (!isLoadingDetails && !isLoadingListings) {
        notFound();
    }

    return null;
} 