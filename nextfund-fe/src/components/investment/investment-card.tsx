import {
  Box,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { getCountryByCode } from '../../constants/countries';
import { Investment } from '../../types/landing-page';
import { transformListingToInvestment } from '../../utils/opportunityTransformer';

export const InvestmentCard: React.FC<{ investment: Investment | any }> = ({ investment }) => {
  const router = useRouter();


  // Helper function to convert country code to country name
  const formatCountryName = (location: string | undefined | null): string => {
    if (!location) return 'Unknown Location';
    const trimmed = String(location).trim();
    if (!trimmed) return 'Unknown Location';
    // Check if it's a country code (2-3 letters, case-insensitive)
    const upperTrimmed = trimmed.toUpperCase();
    if (/^[A-Z]{2,3}$/.test(upperTrimmed)) {
      const country = getCountryByCode(upperTrimmed);
      return country?.name || trimmed;
    }
    return trimmed;
  };

  const normalizedInvestment: Investment = React.useMemo(() => {
    let transformed: Investment;

    if (investment.id && investment.title && investment.category) {
      transformed = investment as Investment;
    } else {
      try {
        transformed = transformListingToInvestment(investment);
      } catch (error) {
        // Return a fallback investment object
        transformed = {
          id: investment.id || `fallback-${Date.now()}`,
          title: investment.business_name || 'Unknown Business',
          category: 'FINTECH',
          location: formatCountryName(investment.location),
          description: 'Investment opportunity details unavailable',
          fundingProgress: 0,
          targetAmount: 0,
          expectedROI: '15-20%',
          minInvestment: 10000,
          investors: 0,
          isSharesCompliant: false,
          founded: 2020,
          teamSize: 10,
          headquarters: 'Unknown',
          investmentTerm: '24 months',
          closingDays: 30,
          businessOverview: 'Business overview unavailable',
          businessOverviewTitle: 'About Business'
        };
      }
    }

    // Always ensure location is converted to country name, even if already transformed
    if (transformed.location) {
      transformed = {
        ...transformed,
        location: formatCountryName(transformed.location)
      };
    }
    if (transformed.headquarters) {
      transformed = {
        ...transformed,
        headquarters: formatCountryName(transformed.headquarters)
      };
    }

    return transformed;
  }, [investment]);

  const getCategoryIcon = (category: Investment['category']) => {
    const iconMap = {
      FINTECH: '/coins-s.png',
      AGRICULTURE: '/plant-s.png',
      HEALTHCARE: '/health.png',
      'REAL ESTATE': '/house.png',
      LOGISTICS: '/coins-s.png',
      ENERGY: '/plant-s.png',
      'Technology': '/coins-s.png',
      'Agriculture': '/plant-s.png',
      'Healthcare': '/health.png',
      'Real Estate': '/house.png',
      'Logistics': '/coins-s.png',
      'Energy': '/plant-s.png',
      'Manufacturing': '/coins-s.png',
      'Hospitality': '/house.png',
    };
    return iconMap[category] || '/coins-s.png';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleViewOpportunity = () => {
    // Navigate to investment details
    router.push(`/investments/${normalizedInvestment.id}`);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: '16px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        },
      }}
    >
      {/* Category Badge */}
      <Box sx={{ mb: 2 }}>
        <Chip
          icon={
            <Image
              src={getCategoryIcon(normalizedInvestment.category)}
              alt={normalizedInvestment.category}
              width={16}
              height={16}
            />
          }
          label={normalizedInvestment.category}
          size="small"
          sx={{
            color: '#043A66',
            backgroundColor: 'transparent',
            border: '1px solid #E5E7EB',
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        />
        {normalizedInvestment.isSharesCompliant && (
          <Chip
            label="Sharia-compliant"
            size="small"
            variant="outlined"
            sx={{
              fontSize: '10px',
              ml: 1,
              color: '#043A66',
              borderColor: '#E5E7EB',
            }}
          />
        )}
      </Box>

      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontSize: '1.125rem',
          fontWeight: 700,
          mb: 1,
          color: '#043A66',
        }}
      >
        {normalizedInvestment.title}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontSize: '0.875rem',
          mb: 1,
          color: '#6A6A6A',
        }}
      >
        {(() => {
          // Helper to check if a value is a valid location (not invalid placeholder text)
          const isValidLocation = (value: string | undefined | null): boolean => {
            if (!value) return false;
            const trimmed = value.trim().toLowerCase();
            const invalidValues = ['none', 'null', 'n/a', 'na', 'growth', 'funding', 'lorem ipsum', 'unknown', 'not provided', 'not specified'];
            return !invalidValues.includes(trimmed) && trimmed.length > 0;
          };

          // Prioritize location over headquarters, but only if location is valid
          const location = normalizedInvestment.location;
          const headquarters = normalizedInvestment.headquarters;

          if (isValidLocation(location)) {
            return location;
          }
          if (isValidLocation(headquarters)) {
            return headquarters;
          }
          return 'Unknown Location';
        })()}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontSize: '0.875rem',
          lineHeight: 1.5,
          color: '#043A66',
          mb: 3,
          flexGrow: 1,
        }}
      >
        {normalizedInvestment.description}
      </Typography>

      {/* Funding Progress */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontSize: '0.875rem', color: '#6A6A6A' }}
          >
            Funding progress
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#043A66',
            }}
          >
            {normalizedInvestment.fundingProgress}%
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={normalizedInvestment.fundingProgress}
          sx={{
            height: 8,
            borderRadius: 4,
            backgroundColor: '#E5E7EB',
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#043A66',
              borderRadius: 4,
            },
          }}
        />
      </Box>

      {/* Investment Metrics */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          pt: 2,
          borderTop: '1px solid #F3F4F6',
          mb: 3,
        }}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.75rem',
              mb: 0.5,
              color: '#6A6A6A',
              display: 'block',
            }}
          >
            Target Amount
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: '#043A66',
            }}
          >
            {formatCurrency(normalizedInvestment.targetAmount)}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.75rem',
              mb: 0.5,
              color: '#6A6A6A',
              display: 'block',
            }}
          >
            Expected ROI
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: '#043A66',
            }}
          >
            {normalizedInvestment.expectedROI}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 2,
          pb: 2,
        }}
      >
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.75rem',
              mb: 0.5,
              color: '#6A6A6A',
              display: 'block',
            }}
          >
            Min Investment
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: '#043A66',
            }}
          >
            {normalizedInvestment.minInvestment
              ? formatCurrency(normalizedInvestment.minInvestment)
              : 'Not provided'}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{
              fontSize: '0.75rem',
              mb: 0.5,
              color: '#6A6A6A',
              display: 'block',
            }}
          >
            Investors
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: '#043A66',
            }}
          >
            {(() => {
              const investors = normalizedInvestment.investors;
              if (investors === undefined || investors === null) {
                return 'Not provided';
              }
              // Handle 0 as a valid value (show "0")
              const numInvestors = typeof investors === 'number' ? investors : Number(investors);
              if (isNaN(numInvestors)) {
                return 'Not provided';
              }
              return numInvestors.toLocaleString('en-US');
            })()}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="caption"
          sx={{
            fontSize: '0.75rem',
            mb: 0.5,
            color: '#6A6A6A',
            display: 'block',
          }}
        >
          Closing In
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontWeight: 600,
            color: '#043A66',
          }}
        >
          {(() => {
            if (typeof normalizedInvestment.closingDays === 'number') {
              const days = normalizedInvestment.closingDays;
              return `${days} day${days === 1 ? '' : 's'}`;
            }

            if (normalizedInvestment.expectedCloseDate) {
              const parsed = new Date(normalizedInvestment.expectedCloseDate);
              if (!Number.isNaN(parsed.getTime())) {
                return parsed.toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                });
              }
            }

            return 'Not provided';
          })()}
        </Typography>
      </Box>

      {/* CTA Button */}
      <Button
        variant="contained"
        size="small"
        fullWidth
        onClick={handleViewOpportunity}
        sx={{
          backgroundColor: '#33CC33',
          color: 'white',
          fontWeight: 500,
          borderRadius: '9999px',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#28a428',
          },
        }}
      >
        View opportunity
      </Button>
    </Paper>
  );
};