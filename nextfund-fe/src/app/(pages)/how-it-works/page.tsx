"use client";

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
import { BusinessesSection, CTASection, HeroSection, InvestorsSection, SecuritySection, WhyChooseSection } from '../../../components/how-it-works';
import { Footer } from '../../../components/layout/footer';
import { Header } from '../../../components/layout/header';

const HowNexfundWorks: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Header />
            <Box sx={{ bgcolor: 'white' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    <HeroSection />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <InvestorsSection />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <BusinessesSection />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <SecuritySection />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <WhyChooseSection />
                </motion.div>
                <Box sx={{ height: { xs: 16, md: 8 } }} />
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <CTASection />
                </motion.div>
                <Box sx={{ height: { xs: 32, md: 48 } }} />
            </Box>
            <Footer />
        </motion.div>
    );
};

export default HowNexfundWorks;