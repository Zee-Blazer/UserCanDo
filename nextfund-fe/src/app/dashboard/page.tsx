'use client';

import { Close } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { DiscoverMore } from '../../components/(dashboard)/dashboard/discover-more';
import { DocumentAccessModal } from '../../components/(dashboard)/dashboard/DocumentAccessModal';
import { DashboardHeader } from '../../components/(dashboard)/dashboard/header';
import { InvestmentCard } from '../../components/(dashboard)/dashboard/investment-card';
import { PortfolioAllocation } from '../../components/(dashboard)/dashboard/portfolio-allocation';
import { RecentActivities } from '../../components/(dashboard)/dashboard/recent-activities';
import { StatsCard } from '../../components/(dashboard)/dashboard/stat-card';
import PaginationControls from '../../components/admin/home/PaginationControls';
import LoadingAnimation from '../loading-lottie';

import { useInvestorDashboard } from '../../hooks/useInvestorDashboard';
import { useInvestorInvestments } from '../../hooks/useInvestorInvestments';
import { useGetInvestorBusinessListingsQuery } from '../../queries/businessApi';
import { useGetInvestorSettingsQuery } from '../../queries/dashboardApi';
import { RootState } from '../../Redux/store';
import { Investment } from '../../types/landing-page';
import { transformListingToInvestment } from '../../utils/opportunityTransformer';

const RECOMMENDED_DEFAULT_PAGE_SIZE = 4;

const InvestmentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my-investments' | 'recommended'>('my-investments');
  const [dateRange, setDateRange] = useState<{ start_date: string | null; end_date: string | null }>({
    start_date: null,
    end_date: null,
  });
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);

  // Pagination state for recommended opportunities (0-based index for consistency)
  const [recommendedPagination, setRecommendedPagination] = useState({ pageIndex: 0, pageSize: RECOMMENDED_DEFAULT_PAGE_SIZE });
  const recommendedPage = recommendedPagination.pageIndex + 1; // Convert to 1-based for API

  const { loginData, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const searchParams = useSearchParams();

  const {
    investorInvestmentsData,
    isLoadingInvestments,
    investmentsError,
    currentPage,
    pageSize,
    totalCount: totalInvestments,
    handlePageChange: handleInvestmentPageChange,
    handlePageSizeChange: handleInvestmentPageSizeChange,
    refreshData: refreshInvestments
  } = useInvestorInvestments(dateRange);

  const {
    dashboardData,
    isLoadingDashboard,
    dashboardError,
    refreshData: refreshDashboard
  } = useInvestorDashboard(dateRange);
  // Track if we're refreshing (either dashboard or investments)
  const isRefreshing = isLoadingDashboard || isLoadingInvestments;

  const {
    data: listingsData,
    isLoading: isLoadingListings,
    error: listingsError
  } = useGetInvestorBusinessListingsQuery({
    page: recommendedPage,
    page_size: recommendedPagination.pageSize
  }, {
    refetchOnMountOrArgChange: true,
    skip: false
  });


  const { data: investorSettings } = useGetInvestorSettingsQuery();

  // Check if KYC documents are uploaded and verified
  const hasKYCDocuments = useMemo(() => {
    if (!investorSettings) return false;

    const rawSettings = investorSettings as any;
    let settingsPayload = null;

    if (rawSettings && typeof rawSettings === 'object') {
      if (rawSettings.payload && typeof rawSettings.payload === 'object') {
        settingsPayload = rawSettings.payload;
      } else {
        settingsPayload = rawSettings;
      }
    }

    if (settingsPayload?.personal_information) {
      const personalInfo = settingsPayload.personal_information;
      // Check if identification_document is present (proof_of_address was removed)
      const hasIdDoc = personalInfo.identification_document && personalInfo.identification_document.trim() !== '';

      // Check verification status - if verified, approved, or active, documents are complete
      const verificationStatus = settingsPayload?.others?.verification_status?.toLowerCase();
      const isVerified = verificationStatus === 'verified' || verificationStatus === 'approved' || verificationStatus === 'active';

      // Return true if document is uploaded AND verified
      return hasIdDoc && isVerified;
    }

    return false;
  }, [investorSettings]);

  // State to track if KYC alert is dismissed
  const [isKYCAlertDismissed, setIsKYCAlertDismissed] = useState(false);

  // Check localStorage on mount and when loginData or investorSettings changes
  useEffect(() => {
    if (!loginData?.user_id || !isLoggedIn) {
      return;
    }


    if (hasKYCDocuments) {
      const userId = loginData.user_id;
      const kycAlertDismissedKey = `kycAlertDismissed_${userId}`;
      if (typeof window !== 'undefined') {
        localStorage.removeItem(kycAlertDismissedKey);
      }
      setIsKYCAlertDismissed(false);
      return;
    }

    // Use user-specific key for dismissal tracking
    const userId = loginData.user_id;
    const kycAlertDismissedKey = `kycAlertDismissed_${userId}`;
    const dismissed = typeof window !== 'undefined'
      ? localStorage.getItem(kycAlertDismissedKey) === 'true'
      : false;

    setIsKYCAlertDismissed(dismissed);
  }, [loginData?.user_id, isLoggedIn, hasKYCDocuments, investorSettings]);

  // Handle KYC alert dismissal
  const handleDismissKYCAlert = () => {
    if (!loginData?.user_id) return;

    const userId = loginData.user_id;
    const kycAlertDismissedKey = `kycAlertDismissed_${userId}`;

    if (typeof window !== 'undefined') {
      localStorage.setItem(kycAlertDismissedKey, 'true');
      setIsKYCAlertDismissed(true);
    }
  };


  useEffect(() => {
    if (listingsData?.page !== undefined && listingsData.page !== null) {
      const apiPage = listingsData.page;
      const normalizedPageIndex =
        apiPage >= 1 &&
          listingsData?.total_pages &&
          listingsData.total_pages > 0 &&
          apiPage <= listingsData.total_pages
          ? apiPage - 1
          : Math.max(0, apiPage);

      if (normalizedPageIndex !== recommendedPagination.pageIndex) {
        setRecommendedPagination(prev => ({ ...prev, pageIndex: normalizedPageIndex }));
      }
    }

  }, [listingsData?.page, listingsData?.total_pages, recommendedPagination.pageIndex, recommendedPagination.pageSize]);

  
  useEffect(() => {
    // Only show for investors
    if (loginData?.user_type !== 'investor' || !isLoggedIn) {
      return;
    }

    // Check URL parameter for explicit modal trigger (overrides everything)
    const urlShowModal = searchParams?.get('showDocumentModal') === 'true';

    // If URL parameter is present, always show modal (ignore localStorage and is_first_login)
    if (urlShowModal) {
      const timer = setTimeout(() => {
        setIsDocumentModalOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }

    
    const userId = loginData?.user_id;
    const modalDismissedKey = userId ? `documentModalDismissed_${userId}` : 'documentModalDismissed';
    const modalDismissed = typeof window !== 'undefined'
      ? localStorage.getItem(modalDismissedKey) === 'true'
      : false;

    if (modalDismissed) {
      // Modal was already dismissed for this user, don't show again
      return;
    }

   
    const isFirstLogin = loginData?.is_first_login === true;

    if (!isFirstLogin) {
      // Not first login, don't show modal
      return;
    }

    
    const timer = setTimeout(() => {
      setIsDocumentModalOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [loginData?.user_type, loginData?.is_first_login, loginData?.user_id, isLoggedIn, searchParams]);

  const recommendedTotalPages = useMemo(() => {
    if (!listingsData) return 0;
    const effectivePageSize = Math.max(
      1,
      recommendedPagination.pageSize || RECOMMENDED_DEFAULT_PAGE_SIZE
    );
    if (typeof listingsData?.count === 'number' && listingsData.count > 0) {
      return Math.max(1, Math.ceil(listingsData.count / effectivePageSize));
    }
    if (typeof listingsData?.total_pages === 'number' && listingsData.total_pages > 0) {
      return listingsData.total_pages;
    }
    return 0;
  }, [listingsData, recommendedPagination.pageSize]);

  // Reset recommended page when tab changes
  const handleTabChange = (tab: 'my-investments' | 'recommended') => {
    setActiveTab(tab);
    if (tab === 'recommended') {
      setRecommendedPagination(prev => ({ ...prev, pageIndex: 0 }));
    }
  };

  // Handle recommended opportunities pagination (0-based index)
  const handleRecommendedPageChange = (newPageIndex: number) => {
    const totalPages = recommendedTotalPages || 1;
    const maxPageIndex = Math.max(0, totalPages - 1);
    const validPageIndex = Math.max(0, Math.min(newPageIndex, maxPageIndex));
    setRecommendedPagination(prev => ({ ...prev, pageIndex: validPageIndex }));
  };

  const handleRecommendedPageSizeChange = (newPageSize: number) => {
    const normalizedSize = Math.max(1, newPageSize);
    setRecommendedPagination(prev => ({ ...prev, pageIndex: 0, pageSize: normalizedSize }));
  };

  // Calculate stats from dashboard API data with fallback to existing calculation
  const statsData = useMemo(() => {
    const formatNumberWithCommas = (value: number, options?: Intl.NumberFormatOptions) =>
      new Intl.NumberFormat('en-US', options).format(Number.isFinite(value) ? value : 0);
    // Use dashboard API data if available, otherwise fallback to existing calculation
    const totalInvested = dashboardData?.total_amount_invested !== undefined && dashboardData?.total_amount_invested !== null
      ? dashboardData.total_amount_invested
      : (investorInvestmentsData?.payload?.reduce((sum, inv) => sum + (inv.amount || 0), 0) || 0);

    const expectedROI = dashboardData?.expected_roi !== undefined && dashboardData?.expected_roi !== null
      ? dashboardData.expected_roi
      : (investorInvestmentsData?.payload && investorInvestmentsData.payload.length > 0
        ? investorInvestmentsData.payload.reduce((sum, inv) => {
          const roi = typeof inv.expected_roi === 'number' ? inv.expected_roi :
            (typeof inv.expected_roi === 'string' ? parseFloat(inv.expected_roi.replace('%', '')) || 0 : 0);
          return sum + roi;
        }, 0) / investorInvestmentsData.payload.length
        : 0);

    const opportunitiesInReview = dashboardData?.opportunities_in_review !== undefined && dashboardData?.opportunities_in_review !== null
      ? dashboardData.opportunities_in_review
      : (investorInvestmentsData?.payload?.filter(inv =>
        inv.due_diligence_status === 'pending' ||
        inv.due_diligence_status === 'in_progress'
      )?.length || 0);

    const portfolioGrowth = dashboardData?.portfolio_growth_percentage !== undefined && dashboardData?.portfolio_growth_percentage !== null
      ? dashboardData.portfolio_growth_percentage
      : 0;

    // Format total invested - show in K if >= 1000, otherwise show full amount
    const formatTotalInvested = (amount: number): string =>
      `$${formatNumberWithCommas(amount, { maximumFractionDigits: 0 })}`;

    const formatPercentage = (
      value: number,
      fractionDigits = 2,
      includeSign = false
    ): string => {
      const normalized = Number.isFinite(value) ? value : 0;
      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
      });
      const formatted = formatter.format(Math.abs(normalized));
      const sign =
        includeSign
          ? normalized > 0
            ? '+'
            : normalized < 0
              ? '-'
              : ''
          : '';
      return `${sign}${formatted}%`;
    };

    return [
      {
        icon: 'wallet',
        title: 'Total Invested',
        value: formatTotalInvested(totalInvested),
        subtitle: totalInvestments > 0 ? `Across ${totalInvestments} ${totalInvestments === 1 ? 'investment' : 'investments'}` : 'No investments yet',
        bgColor: '#EEF2FF',
        subtitleBgColor: '#EEF1F4',
        subtitleTextColor: '#043A66'
      },
      {
        icon: 'chart-pie',
        title: 'Portfolio Growth',
        value: `${portfolioGrowth >= 0 ? '+' : ''}${portfolioGrowth.toFixed(1)}%`,
        subtitle: 'Portfolio growth percentage',
        bgColor: '#F0FDF4',
        subtitleBgColor: '#E8F5E8',
        subtitleTextColor: '#33CC33'
      },
      {
        icon: 'ep-document',
        title: 'Due Diligence',
        value: formatNumberWithCommas(opportunitiesInReview),
        subtitle: opportunitiesInReview === 1 ? 'Opportunity in review' : 'Opportunities in review',
        bgColor: '#FFFBEB',
        subtitleBgColor: '#FFF4E6',
        subtitleTextColor: '#FFB121'
      },
      {
        icon: 'arrow-increase',
        title: 'Expected ROI',
        value: formatPercentage(expectedROI, 2, true),
        subtitle: 'Expected Return on Investment',
        bgColor: '#F0F9FF',
        subtitleBgColor: '#E6F3FF',
        subtitleTextColor: '#97B9FF'
      }
    ];
  }, [dashboardData, investorInvestmentsData, totalInvestments]);


  // Check if investor has expressed interest or has investments
  const hasInvestmentsOrInterest = useMemo(() => {
    // Check if investor has actual investments
    const hasInvestments = investorInvestmentsData?.payload && investorInvestmentsData.payload.length > 0;

    // Check if investor has opportunities in review (indicates expressed interest)
    const hasOpportunitiesInReview = dashboardData?.opportunities_in_review && dashboardData.opportunities_in_review > 0;

    // Check if investor has active investments from dashboard
    const hasActiveInvestments = dashboardData?.active_investments && dashboardData.active_investments.length > 0;

    return hasInvestments || hasOpportunitiesInReview || hasActiveInvestments;
  }, [investorInvestmentsData, dashboardData]);

  const myInvestments: Investment[] = useMemo(() => {
    // Use investor investments data as source for pagination support
    const investmentsToUse = investorInvestmentsData?.payload || [];

    // Only return actual investments, don't fall back to business listings
    if (!investmentsToUse || investmentsToUse.length === 0) {
      return [];
    }

    // Use a Map to track unique investments by ID to prevent duplicates
    const uniqueInvestmentsMap = new Map<string, Investment>();

    investmentsToUse.forEach((investment: any) => {
      // Format expected_roi - it can be a string or number from API
      const roiValue = investment.expected_roi;
      let formattedROI: string;
      if (typeof roiValue === 'number') {
        formattedROI = `${Math.round(roiValue)}%`;
      } else if (typeof roiValue === 'string' && roiValue.trim()) {
        // Ensure "%" is appended if missing
        formattedROI = roiValue.trim().endsWith('%') ? roiValue.trim() : `${roiValue.trim()}%`;
      } else {
        formattedROI = '0%';
      }

      // Format investment date from API
      const investmentDate = investment.created_at
        ? new Date(investment.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
        : '';

      // Get listing_id from investment - prioritize business_listing_id from InvestorInvestment
      let listingId: string | undefined = undefined;
      if (investment.business_listing_id) {
        listingId = investment.business_listing_id;
      } else if (investment.listing_id) {
        listingId = investment.listing_id;
      } else if (investment.business_id) {
        listingId = investment.business_id;
      }

      // Find matching investment in full investor investments data to get business_listing_id
      if (!listingId && investment.id && investorInvestmentsData?.payload) {
        const fullInvestment = investorInvestmentsData.payload.find((inv: any) => inv.id === investment.id);
        if (fullInvestment?.business_listing_id) {
          listingId = fullInvestment.business_listing_id;
        }
      }

      
      const uniqueId = investment.id || `inv-${listingId || 'unknown'}-${Date.now()}`;

      // Skip if we've already processed this investment
      if (uniqueInvestmentsMap.has(uniqueId)) {
        return;
      }

      // Find corresponding business listing to get full details
      const correspondingListing = listingsData?.payload?.find((listing: any) =>
        listing.id === listingId || listing.business_id === listingId
      );

      // Try to get category from investment data or listing, fallback to FINTECH
      const category = (investment as any).category ||
        correspondingListing?.category ||
        investment.investment_sector ||
        (investment as any).sector ||
        'FINTECH';

      // Extract data from business listing if available
      const fundingStructure = correspondingListing?.funding_structure || {};
      const companyMetrics = correspondingListing?.company_metrics_and_financial_information || {};
      const investmentPreference = correspondingListing?.investment_preference || {};

      // Helper function to parse numbers with commas
      const parseNumber = (value: string | number | undefined | null): number => {
        if (typeof value === 'number') return value;
        if (!value) return 0;
        const cleaned = String(value).replace(/,/g, '').replace(/[^0-9.-]/g, '');
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) ? 0 : parsed;
      };

      // Calculate minInvestment from funding_structure
      const minInvestmentValue = fundingStructure.minimum_investment || investmentPreference.minimum_investment;
      const minInvestment = minInvestmentValue ? parseNumber(minInvestmentValue) : 10000;

      // Calculate fundingProgress from funding_structure
      const targetAmount = parseNumber(fundingStructure.funding_amount_seeking || fundingStructure.target_amount) || investment.amount || 0;
      // Only use amount_raised, not current_valuation (valuation is not the same as amount raised)
      const amountRaised = parseNumber(fundingStructure.amount_raised) || 0;
      let fundingProgress = 0;
      if (targetAmount > 0) {
        const progress = Math.round((amountRaised / targetAmount) * 100);
        // Cap at 100% maximum
        fundingProgress = Math.min(progress, 100);
      }

      // Get teamSize from company_metrics_and_financial_information
      const teamSize = parseNumber(companyMetrics.team_size);

      // Get investmentTerm from investment_preference (funding_round_duration in months)
      const fundingRoundDuration = investmentPreference.funding_round_duration || '';
      const investmentTerm = fundingRoundDuration ? `${fundingRoundDuration} months` : '24 months';

      
      let closingDays: number = 0; // Default to 0 if no date provided
      if (investmentPreference.expected_close_date) {
        const expectedCloseDate = new Date(investmentPreference.expected_close_date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        expectedCloseDate.setHours(0, 0, 0, 0);

        if (!isNaN(expectedCloseDate.getTime())) {
          const diffTime = expectedCloseDate.getTime() - today.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          // If date is in the past, set to 0. Otherwise use the actual days (can be any positive number)
          closingDays = diffDays > 0 ? diffDays : 0;
        }
      }

      // Get founded year from company_metrics_and_financial_information or created_at
      const founded = (companyMetrics as any).year_founded
        ? parseNumber((companyMetrics as any).year_founded)
        : (investment.created_at ? new Date(investment.created_at).getFullYear() : 2020);

      const investmentData: Investment = {
        id: uniqueId, 
        listing_id: listingId,
        title: investment.business_name || correspondingListing?.business_name || investment.investment_firm || 'Business Investment',
        category: (category.toUpperCase() as Investment['category']) || 'FINTECH',
        location: investment.business_country || correspondingListing?.location || correspondingListing?.headquarters || 'Nigeria',
        description: `Investment in ${investment.business_name || correspondingListing?.business_name || investment.investment_firm || 'Business'} - Expected ROI: ${formattedROI}`,
        targetAmount: targetAmount,
        expectedROI: formattedROI,
        fundingProgress: fundingProgress,
        minInvestment: minInvestment,
        investors: 0, // Get from count if available
        isSharesCompliant: true,
        founded: founded,
        teamSize: teamSize,
        headquarters: correspondingListing?.headquarters || investment.business_country || correspondingListing?.location || 'Nigeria',
        investmentTerm: investmentTerm,
        closingDays: closingDays,
        businessOverview: `Investment in ${investment.business_name || correspondingListing?.business_name || investment.investment_firm || 'Business'} with ${formattedROI} expected ROI. Status: ${investment.status}, Performance: ${investment.performance || 0}%`,
        businessOverviewTitle: `About Investment in ${investment.business_name || correspondingListing?.business_name || investment.investment_firm || 'Business'}`,
        website: '', // Not in API
        email: '', // Not in API
        phone: '', // Not in API
        created_at: investment.created_at || '',
        // Include full listing data for reference
        funding_structure: fundingStructure,
        company_metrics_and_financial_information: companyMetrics,
        investment_preference: investmentPreference,
      } as Investment & { _originalId?: string };

      // Add _originalId separately to avoid type errors
      (investmentData as any)._originalId = investment.id;

      uniqueInvestmentsMap.set(uniqueId, investmentData);
    });

    return Array.from(uniqueInvestmentsMap.values());
  }, [investorInvestmentsData, listingsData]);

  const investmentsTotalPages = useMemo(() => {
    if (typeof investorInvestmentsData?.total_pages === 'number' && investorInvestmentsData.total_pages > 0) {
      return investorInvestmentsData.total_pages;
    }
    if (typeof investorInvestmentsData?.count === 'number' && investorInvestmentsData.count > 0) {
      const effectivePageSize = Math.max(1, pageSize || RECOMMENDED_DEFAULT_PAGE_SIZE);
      return Math.max(1, Math.ceil(investorInvestmentsData.count / effectivePageSize));
    }
    if (myInvestments.length > 0) {
      const effectivePageSize = Math.max(1, pageSize || RECOMMENDED_DEFAULT_PAGE_SIZE);
      return Math.max(1, Math.ceil(myInvestments.length / effectivePageSize));
    }
    if (typeof investorInvestmentsData?.total_pages === 'number' && investorInvestmentsData.total_pages > 0) {
      return investorInvestmentsData.total_pages;
    }
    return 0;
  }, [investorInvestmentsData?.total_pages, investorInvestmentsData?.count, myInvestments.length, pageSize]);

  // Transform API data to Investment format for recommended opportunities
  const recommendedInvestments: Investment[] = useMemo(() => {
    if (!listingsData?.payload || !Array.isArray(listingsData.payload) || listingsData.payload.length === 0) {
      return [];
    }

    // Use a Map to track unique listings by ID to prevent duplicates
    const uniqueListingsMap = new Map<string, Investment>();

    listingsData.payload.forEach((listing: any, index: number) => {
      const listingKey = listing.id || `listing-${index}`;
      // Skip if we've already processed this listing
      if (uniqueListingsMap.has(listingKey)) {
        return;
      }

      try {
        // Use the centralized transformer
        const transformed = transformListingToInvestment(listing);
        // Ensure the ID is unique
        const investmentWithUniqueId = {
          ...transformed,
          id: listingKey,
        };
        uniqueListingsMap.set(listingKey, investmentWithUniqueId);
      } catch (error) {
        // Silently skip invalid listings
      }
    });

    return Array.from(uniqueListingsMap.values());
  }, [listingsData]);

  const myPageDisplaySize = Math.max(1, pageSize || RECOMMENDED_DEFAULT_PAGE_SIZE);
  const hasMultipleInvestmentPages = investmentsTotalPages > 1;
  const hasMultipleRecommendedPages = recommendedTotalPages > 1;

  // Show pagination when we have data and pagination handlers (matching opportunities pattern)
  const showMyInvestmentsPagination =
    !!investorInvestmentsData &&
    myInvestments.length > 0 &&
    (investmentsTotalPages > 0 ||
      hasMultipleInvestmentPages ||
      investorInvestmentsData.has_next ||
      investorInvestmentsData.has_previous ||
      (investorInvestmentsData.count && investorInvestmentsData.count > 0));

  const recommendedPageDisplaySize = Math.max(
    1,
    recommendedPagination.pageSize || RECOMMENDED_DEFAULT_PAGE_SIZE
  );

  // Show pagination when we have data and pagination handlers (matching opportunities pattern)
  const showRecommendedPagination =
    !!listingsData &&
    recommendedInvestments.length > 0 &&
    (recommendedTotalPages > 0 ||
      hasMultipleRecommendedPages ||
      listingsData.has_next ||
      listingsData.has_previous ||
      (listingsData.count && listingsData.count > 0));

  const getDisplayName = () => {
    if (loginData?.first_name && loginData?.last_name) {
      return `${loginData.first_name} ${loginData.last_name}`;
    }
    return 'User';
  };

  const handleDateRangeChange = (startDate: string | null, endDate: string | null) => {
    setDateRange({
      start_date: startDate,
      end_date: endDate,
    });
  };

  const handleResetDates = () => {
    setDateRange({
      start_date: null,
      end_date: null,
    });
  };

  const handleRefreshAll = () => {
    // Reset dates to ensure we get all data (no date filter)
    setDateRange({
      start_date: null,
      end_date: null,
    });

   
    requestAnimationFrame(() => {
      refreshDashboard();
      refreshInvestments();
    });
  };


  // Check if we have any data or if we're still loading
  const hasAnyData = dashboardData || (investorInvestmentsData?.payload && investorInvestmentsData.payload.length > 0) || (listingsData?.payload && listingsData.payload.length > 0);
  const isInitialLoading = !hasAnyData && (isLoadingDashboard || isLoadingInvestments || isLoadingListings);

  if (isInitialLoading) {
    return <LoadingAnimation isVisible={true} />;
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 4 }, backgroundColor: '#fafafa', minHeight: '100vh' }}>
      <DashboardHeader
        userName={getDisplayName()}
        refreshDataFunc={handleRefreshAll}
        refreshLoading={isRefreshing}
        onDateRangeChange={handleDateRangeChange}
        onResetDates={handleResetDates}
      />

      {/* KYC Documents Warning Banner */}
      {!hasKYCDocuments && !isKYCAlertDismissed && (
        <Box sx={{ position: 'relative', mb: 3 }}>
        <Alert
          severity="warning"
          sx={{
            borderRadius: '12px',
            display: 'flex',
            alignItems: { xs: 'flex-start', sm: 'center' },
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 1.5, sm: 2 },
              position: 'relative',
              pr: 6, 
            '& .MuiAlert-message': {
              width: '100%',
              flex: 1
            },
            '& .MuiAlert-action': {
              paddingTop: { xs: 0, sm: 0 },
              marginLeft: { xs: 0, sm: 'auto' },
              alignSelf: { xs: 'stretch', sm: 'center' }
            }
          }}
          action={
            <Button
              color="inherit"
              size="small"
              href="/dashboard/settings"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                minWidth: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)'
                }
              }}
            >
              Upload Now
            </Button>
          }
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              KYC Documents Required
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                Please upload your KYC documents (Identification Document) in Settings to express interest in investment opportunities.
            </Typography>
          </Box>
        </Alert>
          {/* Close icon positioned at top right */}
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleDismissKYCAlert}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              padding: '4px',
              zIndex: 1,
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            <Close fontSize="small" />
          </IconButton>
        </Box>
      )}

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsData.map((stat, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <StatsCard {...stat} />
          </Grid>
        ))}
      </Grid>

      {/* Navigation Tabs */}
      <Box sx={{ mb: 4 }}>
        <Box
          component="div"
          sx={{
            display: 'flex',
            mb: 3,
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            width: '100%',
          }}
        >
          <Button
            onClick={() => handleTabChange('my-investments')}
            sx={{
              flex: 1,
              borderRadius: 0,
              py: 2,
              px: 0,
              backgroundColor: activeTab === 'my-investments' ? 'transparent' : '#f5f5f5',
              color: '#17406D',
              fontWeight: 500,
              fontSize: '1.1rem',
              boxShadow: 'none',
              transition: 'background 0.2s',
              '&:hover': {
                backgroundColor: activeTab === 'my-investments' ? '#f9f9f9' : '#f5f5f5',
                boxShadow: 'none',
              },
            }}
          >
            My Investments
          </Button>
          <Button
            onClick={() => handleTabChange('recommended')}
            sx={{
              flex: 1,
              borderRadius: 0,
              py: 2,
              px: 0,
              backgroundColor: activeTab === 'recommended' ? 'transparent' : '#f5f5f5',
              color: '#17406D',
              fontWeight: 500,
              fontSize: '1.1rem',
              boxShadow: 'none',
              transition: 'background 0.2s',
              '&:hover': {
                backgroundColor: activeTab === 'recommended' ? '#f9f9f9' : '#f5f5f5',
                boxShadow: 'none',
              },
            }}
          >
            Recommended
          </Button>
        </Box>

        {activeTab === 'my-investments' && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
              Active Investments
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Your current investment portfolio
            </Typography>

            {!hasInvestmentsOrInterest && !isLoadingInvestments && !isLoadingDashboard ? (
              <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
                <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                  No Active Investments
                </Typography>
                <Typography variant="body2" sx={{ color: '#999', mb: 3 }}>
                  You haven't expressed interest in any investment opportunities yet. Explore opportunities to get started.
                </Typography>
                <Button
                  variant="contained"
                  href="/dashboard/opportunities"
                  sx={{
                    backgroundColor: '#4CAF50',
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: '#45a049',
                    },
                  }}
                >
                  Explore Opportunities
                </Button>
              </Box>
            ) : myInvestments.length === 0 && !isLoadingInvestments && !isLoadingListings ? (
              <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
                <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                  No investments found
                </Typography>
                <Typography variant="body2" sx={{ color: '#999' }}>
                  {investorInvestmentsData?.payload && investorInvestmentsData.payload.length === 0
                    ? 'You haven\'t made any investments yet. Explore opportunities to get started.'
                    : 'No investment opportunities are available at this time.'}
                </Typography>
              </Box>
            ) : null}

            {myInvestments.length > 0 && (
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {myInvestments.map((investment, index) => {
                  // Find the corresponding investor investment data for due diligence status and amount
                  const investorData = investorInvestmentsData?.payload?.find(inv => inv.id === (investment as any)._originalId);
                  // Format investment date
                  const investedDate = investment.created_at
                    ? new Date(investment.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                    : '';
                  // Use a composite key to ensure uniqueness
                  const uniqueKey = investment.id || (investment as any)._originalId || `investment-${index}`;
                  return (
                    <Grid size={{ xs: 12, md: 4 }} key={`${uniqueKey}-${index}`}>
                      <InvestmentCard
                        investment={investment}
                        amountInvested={investorData?.amount || 0}
                        dueDiligenceStatus={investorData?.due_diligence_status}
                        investedDate={investedDate}
                      />
                    </Grid>
                  );
                })}
                {myInvestments.length > 0 && (
                  <Grid size={{ xs: 12, md: 4 }}>
                    <DiscoverMore />
                  </Grid>
                )}
              </Grid>
            )}

            {/* Pagination Controls for My Investments - Show when we have data and handlers */}
            {showMyInvestmentsPagination && investorInvestmentsData && (
              <Box sx={{ mt: 4 }}>
                <PaginationControls
                  page={typeof investorInvestmentsData.page === 'number' ? investorInvestmentsData.page : currentPage}
                  pageSize={pageSize}
                  listingData={{
                    count: investorInvestmentsData.count,
                    has_previous: investorInvestmentsData.has_previous,
                    has_next: investorInvestmentsData.has_next,
                    page: investorInvestmentsData.page,
                    total_pages: investmentsTotalPages,
                    items_per_page: investorInvestmentsData.items_per_page
                  }}
                  onPageChange={(newPageIndex) => handleInvestmentPageChange(newPageIndex + 1)}
                  onPageSizeChange={handleInvestmentPageSizeChange}
                />
              </Box>
            )}
          </>
        )}

        {activeTab === 'recommended' && (
          <>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: '#1a1a1a' }}>
              Recommended Opportunities
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 3 }}>
              Shortlisted opportunities for you
            </Typography>

            {recommendedInvestments.length === 0 && !isLoadingListings && (
              <Box sx={{ textAlign: 'center', py: 8, px: 2 }}>
                <Typography variant="h6" sx={{ color: '#666', mb: 1 }}>
                  No opportunities available
                </Typography>
                <Typography variant="body2" sx={{ color: '#999' }}>
                  Check back later for new investment opportunities.
                </Typography>
              </Box>
            )}

            {recommendedInvestments.length > 0 && (
              <Grid container spacing={3} sx={{ mb: 4 }}>
                {recommendedInvestments.map((investment, index) => {
                  // Use a composite key to ensure uniqueness
                  const uniqueKey = investment.id || `recommended-${index}`;
                  return (
                    <Grid size={{ xs: 12, md: 4 }} key={uniqueKey}>
                      <InvestmentCard investment={investment} isRecommended />
                    </Grid>
                  );
                })}
              </Grid>
            )}

            {/* Pagination Controls for Recommended Opportunities */}
            {listingsData && showRecommendedPagination && (
              <Box sx={{ mt: 4 }}>
                <PaginationControls
                  page={typeof listingsData.page === 'number' ? listingsData.page : recommendedPage}
                  pageSize={recommendedPagination.pageSize}
                  listingData={{
                    count: listingsData.count,
                    has_previous: listingsData.has_previous,
                    has_next: listingsData.has_next,
                    page: listingsData.page,
                    total_pages: recommendedTotalPages,
                    items_per_page: listingsData.items_per_page
                  }}
                  onPageChange={handleRecommendedPageChange}
                  onPageSizeChange={handleRecommendedPageSizeChange}
                />
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Bottom Section */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PortfolioAllocation />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <RecentActivities />
        </Grid>
      </Grid>

      {/* Document Access Modal - Auto-opens for investors after signup/login */}
      <DocumentAccessModal
        isOpen={isDocumentModalOpen}
        onClose={() => setIsDocumentModalOpen(false)}
      />
    </Box>
  );
};

export default InvestmentDashboard;