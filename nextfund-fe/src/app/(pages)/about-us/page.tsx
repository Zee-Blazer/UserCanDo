'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { AboutUs } from '../../../components/about-us/about-us-page';
import { Footer, Header } from '../../../components/layout';

const AboutUsPage: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <Header />
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                <AboutUs />
            </motion.main>
            <Footer />
        </motion.div>
    );
};

export default AboutUsPage;