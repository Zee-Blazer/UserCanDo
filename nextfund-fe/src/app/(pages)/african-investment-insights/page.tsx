"use client";

import { motion } from 'framer-motion';
import { AfricanInvestmentInsights } from '../../../components/african-investment-insights/african-investment-insights';
import { Footer, Header } from '../../../components/layout';

const page = () => {
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
        <AfricanInvestmentInsights />
      </motion.main>
      <Footer />
    </motion.div>
  )
}

export default page
