'use client'
import { AnimatedSection } from '@/components/animations/AnimatedComponents';
import { staggerContainer, staggerItem } from '@/components/animations/motion-variants';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { getCountryByCode } from '../../../constants/countries';
import { useGetInvestorBusinessListingsQuery } from '../../../queries/businessApi';
import { Investment } from '../../../types/landing-page';
import { transformListingToInvestment } from '../../../utils/opportunityTransformer';

const getCategoryIcon = (category: Investment['category']) => {
  const iconMap = {
    'FINTECH': '/coins-s.png',
    'AGRICULTURE': '/plant-s.png',
    'HEALTHCARE': '/health.png',
    'REAL ESTATE': '/house.png',
    'LOGISTICS': '/coins-s.png',
    'ENERGY': '/plant-s.png',
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

const ProgressIndicator: React.FC<{ progress: number }> = ({ progress }) => (
  <Box sx={{ width: '100%' }}>
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1, delay: 0.3 }}
      viewport={{ once: true }}
      style={{ originX: 0 }}
    >
      <LinearProgress
        variant="determinate"
        value={progress}
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
    </motion.div>
  </Box>
);

export const FeaturedInvestments: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();

  // Fetch investment opportunities
  const {
    data: opportunitiesData,
    error,
    isLoading
  } = useGetInvestorBusinessListingsQuery({
    page: 1,
    page_size: 4
  });


  const featuredInvestments: Investment[] = useMemo(() => {
    if (!opportunitiesData?.payload || opportunitiesData.payload.length === 0) {
      return [];
    }

    const transformedListings = opportunitiesData.payload
      .slice(0, 4)
      .map((listing: any) => {
        try {
          return transformListingToInvestment(listing);
        } catch (error) {
          return null;
        }
      });

    return transformedListings.filter((investment: Investment | null) => investment !== null) as Investment[];
  }, [opportunitiesData]);

  // Loading state
  if (isLoading) {
    return (
      <Box
        component="section"
        sx={{
          py: { xs: 8, lg: 12 },
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            maxWidth: '1200px',
            mx: 'auto',
            px: { xs: 2, sm: 3, lg: 4 },
          }}
        >
          <Typography variant="h3" component="h2" sx={{ textAlign: 'center', color: '#043A66' }}>
            Loading featured investments...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, lg: 12 },
        backgroundColor: 'white',
      }}
    >
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: { xs: 2, sm: 3, lg: 4 },
        }}
      >
        {/* Section Header */}
        <AnimatedSection className="text-left mb-16">
          <Typography
            variant="h3"
            component="h2"
            className="font-neue-bold"
            sx={{
              fontSize: { xs: '2rem', lg: '2.5rem' },
              fontWeight: 700,
              mb: 2,
              color: '#043A66',
            }}
          >
            Featured Investments
          </Typography>
          <Typography
            variant="h6"
            className="font-neue-regular"
            sx={{
              fontSize: '1.25rem',
              maxWidth: '768px',
              color: '#043A66',
            }}
          >
            Explore our curated selection of high-potential businesses seeking investment.
          </Typography>
        </AnimatedSection>

        {/* Investment Cards Grid */}
        {featuredInvestments.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.2 }}
          >
            <Grid container spacing={{ xs: 3, lg: 4 }} alignItems="stretch">
              {featuredInvestments.map((investment, index) => (
                <Grid
                  size={{ xs: 12, md: 6, lg: 3 }}
                  key={investment.id}
                  sx={{ display: 'flex' }}
                >
                  <motion.div
                    variants={staggerItem}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{ width: '100%', display: 'flex' }}
                  >
                    <Card
                      component={motion.div}
                      whileHover={{
                        y: -10,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                      }}
                      onClick={() => router.push(`/investments/${investment.id}`)}
                      transition={{ duration: 0.3 }}
                      sx={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: 2,
                        cursor: 'pointer'
                      }}
                    >
                      <CardContent
                        sx={{
                          p: 3,
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        {/* Category Badge */}
                        <Box sx={{ mb: 2 }}>
                          <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                            viewport={{ once: true }}
                          >
                            <Chip
                              icon={
                                <Image
                                  src={getCategoryIcon(investment.category)}
                                  alt={investment.category}
                                  width={16}
                                  height={16}
                                />
                              }
                              label={investment.category}
                              size="small"
                              sx={{
                                color: '#043A66',
                                backgroundColor: 'transparent',
                                border: '1px solid #E5E7EB',
                                fontSize: '0.75rem',
                                fontWeight: 500,
                              }}
                            />
                          </motion.div>
                        </Box>

                        {/* Investment Details */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            gap: 2,
                          }}
                        >
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography
                              variant="h6"
                              component="h3"
                              className="font-neue-bold"
                              sx={{
                                fontSize: '1.125rem',
                                fontWeight: 700,
                                mb: 1,
                                color: '#043A66',
                              }}
                            >
                              {investment.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="font-neue-regular"
                              sx={{
                                fontSize: '0.875rem',
                                mb: 1.5,
                                color: '#6A6A6A',
                              }}
                            >
                              {(() => {
                                const location = investment.location;
                                if (!location) return 'Unknown Location';
                                if (/^[A-Z]{2,3}$/.test(location)) {
                                  const country = getCountryByCode(location);
                                  return country?.name || location;
                                }
                                return location;
                              })()}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="font-neue-regular"
                              sx={{
                                fontSize: '0.875rem',
                                lineHeight: 1.5,
                                color: '#043A66',
                              }}
                            >
                              {investment.description}
                            </Typography>
                          </Box>

                          {/* Funding Progress */}
                          <Box sx={{ mb: 2 }}>
                            <Box
                              sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                mb: 1,
                              }}
                            >
                              <Typography
                                variant="body2"
                                sx={{ fontSize: '0.875rem', color: '#6A6A6A' }}
                              >
                                Funding progress
                              </Typography>
                              <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                    color: '#043A66',
                                  }}
                                >
                                  {investment.fundingProgress}%
                                </Typography>
                              </motion.div>
                            </Box>
                            <ProgressIndicator progress={investment.fundingProgress} />
                          </Box>

                          {/* Investment Metrics */}
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            viewport={{ once: true }}
                          >
                            <Box
                              sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr',
                                gap: 2,
                                pt: 2,
                                borderTop: '1px solid #F3F4F6',
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
                                  {formatCurrency(investment.targetAmount)}
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
                                  {investment.expectedROI}
                                </Typography>
                              </Box>
                            </Box>
                          </motion.div>

                          {/* CTA Button */}
                          <Box sx={{ mt: 'auto' }}>
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Button
                                variant="contained"
                                size="small"
                                fullWidth
                                onClick={(e) => {
                                  e.stopPropagation();
                                  router.push(`/investments/${investment.id}`);
                                }}
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
                            </motion.div>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h5" sx={{ color: '#043A66', mb: 2 }}>
              No featured investments available
            </Typography>
            <Typography variant="body1" sx={{ color: '#666' }}>
              Check back later for new investment opportunities.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};